"use client";

import React, { useEffect, useState } from "react";
import LeftSidebar from "@/app/components/LeftSidebar";
import RightSidebar from "@/app/components/RightSidebar";
import MobileNav from "@/app/components/MobileNav";
import Tree from "@/app/components/tree";
import { Droplet } from "lucide-react";
import { useSupabaseClient, User } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function TreeDashboard() {
  const supabase = useSupabaseClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Always fetch the latest user data after mount (especially after Stripe redirect)
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase]);

  const refreshSession = async () => {
    // This will refresh the session and user_metadata
    await supabase.auth.refreshSession();
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    router.refresh(); // Optional: force Next.js to re-render
  };

  const waterLevel = 50;

  // Show badge purchase prompt if user does not have supporterBadge
  if (user && !user.user_metadata?.supporterBadge) {
    return (
      <main className="relative min-h-screen bg-gray-600 text-white flex items-center justify-center">
        <div>
          <p>You do not have a Supporter Badge yet.</p>
          <a
            href="https://buy.stripe.com/test_00wbJ1gTF6oifWd9gqdIA00"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-blue-500 rounded text-white inline-block"
          >
            Buy Supporter Badge & Subscription
          </a>
          <button
            className="mt-4 ml-4 px-4 py-2 bg-green-500 rounded text-white"
            onClick={refreshSession}
          >
            Refresh Status
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-600 text-white">
      <LeftSidebar />
      <RightSidebar />
      <MobileNav />

      <section className="flex flex-col items-center justify-center pt-24 pb-12 px-4 md:pl-72 md:pr-72">
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-xl backdrop-blur-lg transition hover:shadow-2xl">
          {/* Water Level Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full sm:w-3/4 md:w-2/3 h-6 bg-gray-700 rounded-full overflow-hidden border border-white/20">
              <div
                className="flex h-full items-center justify-center bg-blue-500 text-white text-sm font-semibold transition-all duration-500 ease-in-out"
                style={{ width: `${waterLevel}%` }}
              >
                <Droplet className="h-4 w-4" />
                {waterLevel}
              </div>
            </div>
          </div>
          {/* Tree Graphic */}
          <div className="mt-10 flex justify-center">
            <Tree />
          </div>
        </div>
      </section>
    </main>
  );
}
