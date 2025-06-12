"use client";
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent! Please check your inbox.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleReset} className="w-full flex flex-col gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded-lg border px-4 py-3 text-base"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {message && <div className="text-green-600 text-sm">{message}</div>}
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors text-base"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </form>
  );
};

export default ResetPassword;