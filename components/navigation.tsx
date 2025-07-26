"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "HOME" },
    { href: "/code", label: "CODE" },
    { href: "/music", label: "MUSIC" },
    // { href: "/photos", label: "PHOTOS" },
    { href: "/words", label: "WORDS" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center md:me-8 md:mb-1 m-0">
      <div className="w-full max-w-[1024px]">
        <nav className="md:p-4 p-0">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden fixed bottom-4 right-4 w-10 h-10 bg-black text-white flex items-center justify-center shadow-lg z-50 dark:border p-1"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Navigation Links */}
          <div
            className={cn(
              "md:p-2 p-4 flex md:flex-col gap-3 bg-black bg-opacity-50 dark:bg-opacity-80 md:bg-transparent md:gap-0 items-center md:items-end justify-center transition-all",
              "grid grid-cols-3 md:grid-cols-none md:flex",
              isOpen ? "grid md:flex" : "hidden md:flex"
            )}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-white md:bg-transparent md:text-2xl hover:text-gray-200 dark:hover:text-gray-200 transition-colors text-sm font-bold md:font-normal",
                  pathname === link.href && "font-bold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
