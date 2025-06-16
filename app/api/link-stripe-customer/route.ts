import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, email } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: "userId and email are required" }, { status: 400 });
    }

    // Check if user already has a Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    if (user && user.stripe_customer_id) {
      // Already linked
      return NextResponse.json({ stripe_customer_id: user.stripe_customer_id });
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({ email });

    // Update Supabase user with stripe_customer_id
    const { error: updateError } = await supabase
      .from("User")
      .update({ stripe_customer_id: customer.id })
      .eq("id", userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ stripe_customer_id: customer.id });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}