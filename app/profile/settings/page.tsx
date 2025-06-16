"use client";
import React from "react";
import LeftSidebar from "@/app/components/LeftSidebar";
import RightSidebar from "@/app/components/RightSidebar";
import MobileNav from "@/app/components/MobileNav";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
   const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
            bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl
            p-6 transition
          "
        >
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
        </div>
      </section>
    </main>
  );
}
