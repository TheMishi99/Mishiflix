"use client";
import Navbar from "@/components/ui/Navbar";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavbarItem } from "@/types/other-types";
import { ReactNode, useMemo } from "react";

const titlesByLanguage = {
  "en-US": {
    popular: "Popular",
    topRated: "Top Rated",
    nowPlaying: "Now Playing",
    upcoming: "Upcoming",
    filter: "Filter",
  },
  "es-AR": {
    popular: "Populares",
    topRated: "Mejor Valoradas",
    nowPlaying: "En Cartelera",
    upcoming: "Próximos Estrenos",
    filter: "Filtrar",
  },
  "fr-FR": {
    popular: "Populaires",
    topRated: "Les Mieux Notés",
    nowPlaying: "À l'Affiche",
    upcoming: "À Venir",
    filter: "Filtrer",
  },
};

export default function MoviesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { language } = useLanguage();
  const navbaritems: NavbarItem[] = useMemo(
    () => [
      {
        id: 1,
        condition: true,
        url: "/movies/popular",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].popular,
      },
      {
        id: 2,
        condition: true,
        url: "/movies/top-rated",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].topRated,
      },
      {
        id: 3,
        condition: true,
        url: "/movies/now-playing",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage]
            .nowPlaying,
      },
      {
        id: 4,
        condition: true,
        url: "/movies/upcoming",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].upcoming,
      },
      {
        id: 5,
        condition: true,
        url: "/movies/filter",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].filter,
      },
    ],
    [language]
  );
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2">
      <SearchBar submit_url="/movies/search" />
      <Navbar navbarItems={navbaritems} />
      {children}
    </div>
  );
}
