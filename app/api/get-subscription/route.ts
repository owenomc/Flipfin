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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Fetch user from Supabase
  const { data: user, error } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single();

  if (error || !user?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No Stripe customer found." },
      { status: 404 }
    );
  }

  // Fetch subscriptions from Stripe
  const subscriptions = await stripe.subscriptions.list({
    customer: user.stripe_customer_id,
    status: "all",
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    return NextResponse.json({ status: "none" });
  }

  const subscription = subscriptions.data[0];
  return NextResponse.json({ subscription, status: subscription.status });
}