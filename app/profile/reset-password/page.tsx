"use client";
import React, { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Password reset email sent! Please check your inbox.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset your password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <label htmlFor="email" className="text-base font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="rounded-lg border px-4 py-3 text-base"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
        />
        {status === "error" && (
          <div className="text-red-500 text-sm">{message}</div>
        )}
        {status === "success" && (
          <div className="text-green-600 text-sm">{message}</div>
        )}
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors text-base"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </div>
  );
}