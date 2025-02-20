"use client";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavBarItem } from "@/types/other-types";

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const navBarItemsByLanguage: { [key: string]: NavBarItem[] } = {
    "en-US": [
      {
        render_condition: true,
        url: "/people/popular",
        title: "Popular",
      },
    ],
    "es-AR": [
      {
        render_condition: true,
        url: "/people/popular",
        title: "Populares",
      },
    ],
    "fr-FR": [
      {
        render_condition: true,
        url: "/people/popular",
        title: "Populaires",
      },
    ],
  };
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      <SearchBar submit_url="/people/search" />
      <NavBar
        navBarItems={
          navBarItemsByLanguage[language as keyof typeof navBarItemsByLanguage]
        }
      />
      {children}
    </div>
  );
}
