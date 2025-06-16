"use client";
import React, { useEffect, useState } from "react";
import LeftSidebar from "@/app/components/LeftSidebar";
import RightSidebar from "@/app/components/RightSidebar";
import MobileNav from "@/app/components/MobileNav";
import { supabase } from "@/app/utils/supabaseClient";

type UserType = {
  id: string;
  email: string | null;
  created_at: string;
  user_metadata: {
    display_name?: string;
    phone?: string;
    [key: string]: unknown;
  };
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data first
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
        setDisplayName("");
      } else if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email ?? null,
          created_at: data.user.created_at,
          user_metadata: data.user.user_metadata,
        };
        setUser(userData);
        setDisplayName(data.user.user_metadata?.display_name || "");

        // Only fetch subscription if user and user.id exist
        if (data.user && data.user.id) {
          fetch(`/api/get-subscription?userId=${data.user.id}`)
            .then((res) => res.json())
            .then((subData) => {
              console.log("Subscription API response:", subData); // For debugging
              if (
                subData.subscription &&
                subData.subscription.status === "active"
              ) {
                setStatus("active");
              } else if (subData.error === "No Stripe customer found.") {
                setStatus("no_customer");
              } else if (subData.error === "No subscription found.") {
                setStatus("no_active_subscription");
              } else {
                setStatus("no_active_subscription");
              }
            })
            .catch(() => setStatus("no_active_subscription"));
        }
      } else {
        setUser(null);
        setDisplayName("");
      }
    };

    fetchUser();
  }, []);

  const updateDisplayName = async () => {
    if (!user) return;
    setSaving(true);
    setMessage(null);

    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        display_name: displayName,
      },
    });

    if (error) {
      setMessage(`Error updating display name: ${error.message}`);
    } else if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email ?? null,
        created_at: data.user.created_at,
        user_metadata: data.user.user_metadata,
      });
      setMessage("Display name updated successfully!");
    }

    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-gray-800 text-white relative">
      <LeftSidebar />
      <RightSidebar />
      <MobileNav />

      <section
        className="
          pt-20 px-4 pb-8
          md:pl-72 md:pr-72 md:pt-10
          max-w-5xl mx-auto
          grid gap-6
        "
      >
        <div
          className="
            bg-slate-900 backdrop-blur-sm border border-white/20 rounded-2xl
            p-6 transition
          "
        >
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {user?.user_metadata?.display_name || "User"}
          </h1>
          {user ? (
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <strong>User ID:</strong> {user.id}
              </li>
              <li>
                <strong>Email:</strong> {user.email || "No email provided"}
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                {user.user_metadata?.phone || "No phone number"}
              </li>
              <li>
                <strong>Account Created:</strong>{" "}
                {user.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : "N/A"}
              </li>
            </ul>
          ) : (
            <p className="mb-6">User not logged in.</p>
          )}

          <div className="max-w-sm">
            <label htmlFor="displayName" className="block font-semibold mb-1">
              Edit Display Name:
            </label>
            <input
              id="displayName"
              type="text"
              className="w-full rounded border border-gray-600 bg-gray-800 p-2 mb-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={saving || !user}
              placeholder={user ? "" : "Sign in to edit"}
            />
            <button
              onClick={updateDisplayName}
              disabled={saving || !user}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 px-4 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
          </div>
        </div>
      </section>

      <section className="pt-20 px-4 pb-8 md:pl-72 md:pr-72 md:pt-10 max-w-5xl mx-auto grid gap-6">
        <div className="bg-slate-900 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition">
          <h2 className="text-2xl font-bold mb-4">Subscription Status</h2>
          {status === "active" && <p>You have an active subscription.</p>}
          {status === "no_active_subscription" && (
            <p>No active subscription found.</p>
          )}
          {status === "no_customer" && <p>No Stripe customer found.</p>}
          <small className="text-sm text-gray-400">Powered by Stripe</small>
        </div>
      </section>
    </main>
  );
}
