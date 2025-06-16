"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, LogIn, UserPlus, Settings } from "lucide-react";
import { supabase } from "@/app/utils/supabaseClient";

export default function RightSidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null means "loading"

  useEffect(() => {
    let isMounted = true;

    // Get session once
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setIsLoggedIn(!!data.session?.user);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isLoggedIn === null) {
    // While loading, render nothing or a spinner to avoid flicker
    return null; 
  }

  const navItems = isLoggedIn
    ? [
        { name: "Profile", href: "/profile", icon: UserIcon, isButton: false },
        { name: "Settings", href: "/profile/settings", icon: Settings, isButton: false },
      ]
    : [
        { name: "Sign-In", href: "/profile/sign-in", icon: LogIn, isButton: true },
        { name: "Sign-Up", href: "/profile/sign-up", icon: UserPlus, isButton: true },
      ];

  return (
    <aside
      className="
        hidden md:flex
        fixed top-0 right-0 h-full
        w-20 md:w-72
        flex-col items-start
        px-2 md:px-6 py-6
        space-y-6
        bg-slate-900 text-gray-200
        border-l border-white/20
        backdrop-blur-lg shadow-inner
        z-40
      "
      aria-label="User navigation"
    >
      <nav className="flex flex-col space-y-4 w-full">
        {navItems.map(({ name, href, icon: Icon, isButton }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2 w-full rounded-xl
                transition-all duration-200
                ${isActive ? "bg-green-500/30 text-green-400 font-semibold" : ""}
                ${
                  isButton
                    ? "bg-green-700 hover:bg-green-600 text-white justify-center"
                    : "hover:bg-white/10 hover:text-gray-300"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={30} />
              <span className="hidden md:inline">{name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="text-sm text-white mt-auto">&copy; {new Date().getFullYear()} TreeFinances</div>
    </aside>
  );
}
