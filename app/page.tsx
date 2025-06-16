"use client";

import React from "react";
import LeftSidebar from "@/app/components/LeftSidebar";
import RightSidebar from "@/app/components/RightSidebar";
import MobileNav from "@/app/components/MobileNav";
import Tree from "@/app/components/tree";
import { Droplet } from "lucide-react";

export default function TreeDashboard() {
  const waterLevel = 50;

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
