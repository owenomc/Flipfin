"use client";
import React from "react";
import LeftSidebar from "@/app/components/LeftSidebar";
import RightSidebar from "@/app/components/RightSidebar";
import MobileNav from "@/app/components/MobileNav";

export default function Games() {
  return (
    <main className="min-h-screen bg-gray-800 text-white relative">
      {/* Left Sidebar (desktop and up) */}
      <LeftSidebar />

      {/* Right Sidebar (desktop and up) */}
      <RightSidebar user={null} />

      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Main content area */}
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
            p-6 hover:ring-2 hover:ring-yellow-400 transition
          "
        >
          <p className="text-lg font-semibold mb-3">Cash or Not</p>
          Lesson
        </div>
      </section>
    </main>
  );
}
