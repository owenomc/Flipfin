"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      // Link Stripe customer after sign up
      await fetch("/api/link-stripe-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id, email }),
      });
      router.push("/profile/sign-in"); // Redirect to sign-in
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
        <input
          className="w-full px-4 py-2 rounded bg-slate-800"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 rounded bg-slate-800"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-400">{error}</p>}
        <button className="w-full py-2 bg-green-600 hover:bg-green-500 rounded text-white">
          Sign Up
        </button>
      </form>
    </main>
  );
}
