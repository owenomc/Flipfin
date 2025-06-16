import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Check if customer already exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length > 0) {
      return NextResponse.json({ customer: customers.data[0] });
    }

    // Create new customer
    const customer = await stripe.customers.create({ email });
    return NextResponse.json({ customer });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}