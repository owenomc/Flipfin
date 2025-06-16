"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TreeDeciduous,
  BookOpen,
  Gamepad2,
  RefreshCcw,
  User,
} from "lucide-react";

const navItems = [
  { name: "Tree", href: "/", icon: <TreeDeciduous size={16} /> },
  { name: "Lessons", href: "/lessons", icon: <BookOpen size={16} /> },
  { name: "Games", href: "/games", icon: <Gamepad2 size={16} /> },
  { name: "Review", href: "/review", icon: <RefreshCcw size={16} /> },
  { name: "Profile", href: "/profile", icon: <User size={16} /> },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed top-0 left-0 right-0
        z-50 bg-slate-900 backdrop-blur-lg border-b border-white/20
        flex justify-between items-center
        px-4 py-3
        md:hidden
        overflow-x-auto
        scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900
      "
      aria-label="Mobile navigation"
    >
      <div className="flex justify-center gap-3 whitespace-nowrap w-full">
        {navItems.map(({ name, href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`
                flex flex-col items-center
                rounded-md
                px-3 py-1
                text-xs font-medium
                transition-colors duration-200
                ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {icon}
              <span className="mt-1">{name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
