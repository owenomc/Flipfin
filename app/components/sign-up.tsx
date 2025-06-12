"use client";
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border px-4 py-3 text-base"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border px-4 py-3 text-base"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm">
          Sign up successful! Please check your email to confirm your account.
        </div>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors text-base"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;