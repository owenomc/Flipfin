"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#18181b] dark:to-[#232329] flex">
      {/* Persistent Left Sidebar */}
      <aside className="w-80 bg-white dark:bg-[#121212] shadow-lg border-l border-gray-200 dark:border-gray-700 flex flex-col p-6">
        <p className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          News
        </p>
      </aside>
      
      {/* Main Content - takes full width minus sidebar */}
      <main className="flex-grow flex flex-col items-center px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Finance AI
        </h2>

        <div className="w-full grid gap-6">
          {/* Lesson Card */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                🏁 Unit 1: Checking & Savings
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Learn the difference, earn your first XP!
              </p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow">
              Start
            </button>
          </div>

          {/* Locked Lesson */}
          <div className="opacity-50 bg-gray-100 dark:bg-[#2a2a2a] rounded-2xl px-6 py-5 border border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500">
                🔒 Unit 2: Budgeting Basics
              </h3>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Unlock Unit 1 to continue
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500">Locked</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mt-12 w-full max-w-sm text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            🎯 Daily Goal: Earn 10 XP
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-yellow-400 h-full rounded-full transition-all"
              style={{ width: "30%" }}
            />
          </div>
        </div>
      </main>

      {/* Persistent Right Sidebar */}
      <aside className="w-80 bg-white dark:bg-[#121212] shadow-lg border-l border-gray-200 dark:border-gray-700 flex flex-col p-6">
        <p className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Profile
        </p>

        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors text-base"
        >
          <Link href="/profile">Sign In</Link>
        </button>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
          &copy; {new Date().getFullYear()} Finance
        </div>
      </aside>
    </div>
  );
}
