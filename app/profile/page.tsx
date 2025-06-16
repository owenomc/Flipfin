"use client";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  displayName: string;
  created_at: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock user fetch - replace with your auth logic
  useEffect(() => {
    async function fetchUser() {
      // Replace this with your real user fetching logic
      const mockUser = {
        id: "17618a72-26f6-46a0-a3f2-f01f647e57ca",
        email: "owenmcrandall@gmail.com",
        displayName: "Owen",
        created_at: "2025-06-11T21:45:13Z",
      };
      setUser(mockUser);
    }
    fetchUser();
  }, []);

  // Link user to Stripe customer if needed
  useEffect(() => {
    if (!user) return;
    async function linkStripeCustomer() {
      try {
        const res = await fetch("/api/link-stripe-customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user!.id, email: user!.email }),
        });
        if (!res.ok) throw new Error("Failed to link Stripe customer");
      } catch {
        setError("Could not link Stripe customer.");
      }
    }
    linkStripeCustomer();
  }, [user]);

  // Fetch subscription status
  useEffect(() => {
    if (!user) return;
    async function fetchSubscription() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/get-subscription?userId=${user!.id}`);
        const data = await res.json();
        if (res.ok) {
          setSubscriptionStatus(data.status || "none");
        } else {
          setSubscriptionStatus("none");
        }
      } catch {
        setError("Failed to fetch subscription status.");
      }
      setLoading(false);
    }
    fetchSubscription();
  }, [user]);

  // Replace with your actual price ID for the Subscription product
  const SUBSCRIPTION_PRICE_ID = "price_1RaSbbHHL2SneYeWEOsUtWIU"; // Your Stripe price ID

  async function handleSubscribe() {
    setError("");
    if (!user) {
      setError("User not loaded.");
      return;
    }
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          priceId: SUBSCRIPTION_PRICE_ID,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not start subscription.");
      }
    } catch {
      setError("Could not start subscription.");
    }
  }

  if (!user) return <div>Loading user...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Welcome, {user.displayName}</h2>
      <div>
        <strong>User ID:</strong> {user.id}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Account Created:</strong>{" "}
        {new Date(user.created_at).toLocaleString()}
      </div>
      <hr />
      <div>
        <strong>Subscription Status:</strong>{" "}
        {loading ? "Loading..." : subscriptionStatus}
      </div>
      {subscriptionStatus === "none" && (
        <button onClick={handleSubscribe} style={{ marginTop: 16 }}>
          Subscribe
        </button>
      )}
      <div style={{ marginTop: 32, fontSize: 12, color: "#888" }}>
        Powered by Stripe
      </div>
    </div>
  );
}