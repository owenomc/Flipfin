"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TreeDeciduous, BookOpen, Gamepad2, RefreshCcw } from "lucide-react";

const navItems = [
  { name: "Tree", href: "/", icon: TreeDeciduous },
  { name: "Lessons", href: "/lessons", icon: BookOpen },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "Review", href: "/review", icon: RefreshCcw },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={`
    hidden md:flex
    fixed top-0 left-0 h-full
    bg-slate-900 backdrop-blur-lg border-r border-white/20
    flex-col items-start
    text-gray-200 shadow-inner
    transition-all duration-300
    z-40
    w-20 md:w-72
    px-2 md:px-6 py-6
    space-y-6
  `}
      aria-label="Main navigation"
    >
      <nav className="flex flex-col space-y-4 w-full">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`
                flex items-center gap-3
                rounded-xl 
                px-3 py-2
                transition-colors duration-200
                w-full
                ${
                  isActive
                    ? "bg-green-500/30 text-green-400 font-semibold"
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
    </aside>
  );
}
