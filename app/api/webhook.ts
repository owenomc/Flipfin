import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

// Supabase service role key (very sensitive)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This disables the default body parser to get raw body (required for Stripe)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get raw body buffer
import { Readable } from "stream";

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (unknown) {
    console.error("Stripe webhook signature verification failed:", unknown);
    return res.status(400).send(`Webhook Error: ${unknown}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      console.error("No customer email in session");
      return res.status(400).send("No customer email in session");
    }

    console.log("Checkout session completed for:", customerEmail);

    // Update Supabase user metadata
    // First fetch user by email
    const { data: userData, error: userFetchError } = await supabase
      .from("users")
      .select("id, user_metadata")
      .eq("email", customerEmail)
      .single();

    if (userFetchError || !userData) {
      console.error("User not found in Supabase:", userFetchError);
      return res.status(404).send("User not found");
    }

    // Fetch all users and filter by email (listUsers does not accept email param)
    const { data: users, error: authFetchError } = await supabase.auth.admin.listUsers();
    if (authFetchError || !users || users.users.length === 0) {
      console.error("Auth user not found:", authFetchError);
      return res.status(404).send("Auth user not found");
    }
    const authUser = users.users.find((u) => u.email === customerEmail);
    if (!authUser) {
      console.error("Auth user not found with email:", customerEmail);
      return res.status(404).send("Auth user not found");
    }

    // Merge existing user_metadata with supporterBadge = true
    const updatedMetadata = {
      ...authUser.user_metadata,
      supporterBadge: true,
    };

    // Update user metadata
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      authUser.id,
      {
        user_metadata: updatedMetadata,
      }
    );

    if (updateError) {
      console.error("Failed to update user metadata:", updateError);
      return res.status(500).send("Failed to update user metadata");
    }

    console.log(`Supporter badge granted to user ${userData.id}`);
  }

  res.json({ received: true });
}
