"use client";
import { NavBarItem } from "@/types/other-types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar({ navBarItems }: { navBarItems: NavBarItem[] }) {
  const pathname = usePathname();
  const [url, setUrl] = useState(pathname);

  useEffect(() => {
    setUrl(pathname);
  }, [pathname]);

  return (
    <nav className="w-full flex justify-center items-center">
      <ul className="w-full flex flex-wrap justify-center items-center p-2 gap-2">
        {navBarItems.map(
          (navBarItem, index) =>
            navBarItem.render_condition && (
              <li key={index + navBarItem.url}>
                <Link
                  href={navBarItem.url}
                  className={`flex p-2 rounded-xl ${
                    url.includes(navBarItem.url)
                      ? "bg-red-600"
                      : "bg-zinc-800 hover:bg-red-500"
                  }`}
                >
                  {navBarItem.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
