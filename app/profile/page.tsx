// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import ResetPassword from "../components/reset-password";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#18181b] p-4 sm:p-10">
      <main className="bg-white/90 dark:bg-[#232329]/90 rounded-3xl shadow-xl p-8 sm:p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Profile
        </h1>

        {!user ? (
          <>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
              {showReset
                ? "Reset your password"
                : showSignUp
                ? "Create an account"
                : "Sign in to your account"}
            </p>
            <div className="bg-white dark:bg-[#1a1a1a] border dark:border-gray-700 rounded-xl p-6">
              {showReset ? (
                <ResetPassword />
              ) : showSignUp ? (
                <SignUp />
              ) : (
                <>
                  <SignIn />
                  <button
                    className="text-blue-600 dark:text-blue-400 text-xs mt-2 underline"
                    onClick={() => setShowReset(true)}
                  >
                    Forgot password?
                  </button>
                </>
              )}
              {!showReset && (
                <button
                  className="text-blue-600 dark:text-blue-400 text-xs mt-4 underline"
                  onClick={() => setShowSignUp(!showSignUp)}
                >
                  {showSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </button>
              )}
              {showReset && (
                <button
                  className="text-blue-600 dark:text-blue-400 text-xs mt-4 underline"
                  onClick={() => setShowReset(false)}
                >
                  Back to Sign In
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{user.email}</p>
            <button
              onClick={handleSignOut}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full"
            >
              Sign Out
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
