"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/code", label: "CODE" },
    { href: "/music", label: "MUSIC" },
    { href: "/photos", label: "PHOTOS" },
    { href: "/words", label: "WORDS" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center md:me-8 md:mb-3">
      <div className="w-full max-w-[1024px]">
        <nav className=" p-4">
          <div className="flex flex-col items-end space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "bg-gray-400 md:bg-transparent md:text-2xl hover:text-gray-500 dark:hover:text-gray-400 transition-colors",
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
