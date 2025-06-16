"use client";
import React, { useEffect, useState } from "react";
import LeftSidebar from "@/app/components/LeftSidebar";
import RightSidebar from "@/app/components/RightSidebar";
import MobileNav from "@/app/components/MobileNav";
import { supabase } from "@/app/utils/supabaseClient";

type UserProfile = {
  id: string;
  email: string | undefined;
  created_at: string | null;
  user_metadata: {
    display_name?: string;
    phone?: string;
    [key: string]: unknown;
  } | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  // remove loading state
  // const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
        setDisplayName("");
      } else if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at,
          user_metadata: data.user.user_metadata,
        };
        setUser(userData);
        setDisplayName(data.user.user_metadata?.display_name || "");
      } else {
        setUser(null);
        setDisplayName("");
      }
      // no loading state to update
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
        email: data.user.email,
        created_at: data.user.created_at,
        user_metadata: data.user.user_metadata,
      });
      setMessage("Display name updated successfully!");
    }

    setSaving(false);
  };

  // Instead of blocking render, show main UI immediately
  // Display fallback info if user is null

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
            bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl
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
                <strong>Phone:</strong> {user.user_metadata?.phone || "No phone number"}
              </li>
              <li>
                <strong>Account Created:</strong>{" "}
                {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
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
              className="w-full rounded border border-gray-600 bg-gray-900 p-2 mb-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
    </main>
  );
}
