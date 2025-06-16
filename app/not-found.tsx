"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white px-4">
      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
          404
        </h1>
        <p className="text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-sm text-gray-300 mb-6">
          Oops! The page you&apos;re on has disappeared into the void.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-3 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
