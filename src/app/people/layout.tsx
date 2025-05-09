"use client";
import Navbar from "@/components/ui/Navbar";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavbarItem } from "@/types/other-types";
import { ReactNode, useMemo } from "react";

const titlesByLanguage = {
  "en-US": {
    popular: "Popular",
  },
  "es-AR": {
    popular: "Populares",
  },
  "fr-FR": {
    popular: "Populaires",
  },
};

export default function PeopleLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { language } = useLanguage();
  const navbarItems: NavbarItem[] = useMemo(
    () => [
      {
        id: 1,
        condition: true,
        url: "/people/popular",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].popular,
      },
    ],
    [language]
  );
  return (
    <div className="flex-1 flex flex-col justify-start items-center p-2 gap-2">
      <SearchBar submit_url="/people/search" />
      <Navbar navbarItems={navbarItems} />
      {children}
    </div>
  );
}
