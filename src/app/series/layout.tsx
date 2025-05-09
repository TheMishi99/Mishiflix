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
    onTheAir: "On The Air",
    airingToday: "Airing Today",
    filter: "Filter",
  },
  "es-AR": {
    popular: "Populares",
    topRated: "Mejor Valoradas",
    onTheAir: "En Emisión",
    airingToday: "Emitiendo Hoy",
    filter: "Filtrar",
  },
  "fr-FR": {
    popular: "Populaires",
    topRated: "Les Mieux Notés",
    onTheAir: "En Cours de Diffusion",
    airingToday: "Diffusé Aujourd'hui",
    filter: "Filtrer",
  },
};

export default function SeriesLayout({
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
        url: "/series/popular",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].popular,
      },
      {
        id: 2,
        condition: true,
        url: "/series/top-rated",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].topRated,
      },
      {
        id: 3,
        condition: true,
        url: "/series/on-the-air",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].onTheAir,
      },
      {
        id: 4,
        condition: true,
        url: "/series/airing-today",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage]
            .airingToday,
      },
      {
        id: 5,
        condition: true,
        url: "/series/filter",
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].filter,
      },
    ],
    [language]
  );
  return (
    <div className="flex-1 flex flex-col justify-start items-center p-2 gap-2">
      <SearchBar submit_url="/series/search" />
      <Navbar navbarItems={navbarItems} />
      {children}
    </div>
  );
}
