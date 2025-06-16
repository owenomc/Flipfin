"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  stripe_customer_id?: string | null;
  [key: string]: unknown; // Add more fields as needed
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [subscriptionRaw, setSubscriptionRaw] = useState<unknown>(null);
  const [userId] = useState<string>("17618a72-26f6-46a0-a3f2-f01f647e57ca");

  useEffect(() => {
    // Fetch user from Supabase (replace with your real fetch if needed)
    fetch(`/api/get-user?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setStripeCustomerId(data.user?.stripe_customer_id ?? null);

        // Fetch subscription if customer id exists
        if (data.user?.id) {
          fetch(`/api/get-subscription?userId=${data.user.id}`)
            .then((res) => res.json())
            .then((subData) => {
              setSubscriptionRaw(subData);
              if (subData.subscription && subData.subscription.status === "active") {
                setStatus("active");
              } else if (subData.error === "No Stripe customer found.") {
                setStatus("no_customer");
              } else if (subData.error === "No subscription found.") {
                setStatus("no_active_subscription");
              } else {
                setStatus("no_active_subscription");
              }
            })
            .catch((err) => {
              setStatus("no_active_subscription");
              setSubscriptionRaw({ error: err.message });
            });
        }
      })
      .catch((err) => {
        setUser(null);
        setStripeCustomerId(null);
        setStatus("no_customer");
        setSubscriptionRaw({ error: err.message });
      });
  }, [userId]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-900 rounded-lg shadow text-white">
      <h1 className="text-3xl font-bold mb-4">Debug Profile Page</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Info</h2>
        <pre className="bg-gray-800 p-2 rounded text-sm overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
        <div className="mt-2">
          <strong>Stripe Customer ID:</strong>{" "}
          <span className="text-green-400">{stripeCustomerId || "None"}</span>
        </div>
        <div>
          <strong>User ID:</strong> <span>{userId}</span>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Subscription Status</h2>
        {status === "active" && <p className="text-green-400">You have an active subscription.</p>}
        {status === "no_active_subscription" && <p>No active subscription found.</p>}
        {status === "no_customer" && <p>No Stripe customer found.</p>}
        <small className="text-sm text-gray-400">Powered by Stripe</small>
        <pre className="bg-gray-800 p-2 rounded text-xs mt-2 overflow-x-auto">
          {JSON.stringify(subscriptionRaw, null, 2)}
        </pre>
      </div>
    </div>
  );
}