"use client";
import { NavbarItem } from "@/types/other-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({
  navbarItems,
  direction = "row",
}: {
  navbarItems: NavbarItem[];
  direction?: "row" | "col";
}) {
  const pathname = usePathname();
  return (
    <nav className="w-full sm:w-auto flex justify-center items-center">
      <ul
        className={`w-full flex flex-${direction} ${
          direction === "row" ? "flex-wrap" : ""
        } justify-center items-center p-2 gap-2`}
      >
        {navbarItems.map(
          (navbarItem) =>
            navbarItem.condition && (
              <li
                key={navbarItem.id + navbarItem.title}
                className={`flex ${direction === "col" ? "w-full" : ""}`}
              >
                <Link
                  href={navbarItem.url}
                  className={`w-full text-center p-2 rounded-xl ${
                    pathname.includes(navbarItem.url)
                      ? "bg-red-600"
                      : "bg-zinc-800 hover:bg-red-500"
                  }`}
                >
                  {navbarItem.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
