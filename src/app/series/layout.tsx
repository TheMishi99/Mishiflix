"use client";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavBarItem } from "@/types/other-types";

export default function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const navBarItemsByLanguage: { [key: string]: NavBarItem[] } = {
    "en-US": [
      {
        render_condition: true,
        url: "/series/popular",
        title: "Popular",
      },
      {
        render_condition: true,
        url: "/series/top-rated",
        title: "Top Rated",
      },
      {
        render_condition: true,
        url: "/series/on-the-air",
        title: "On The Air",
      },
      {
        render_condition: true,
        url: "/series/airing-today",
        title: "Airing Today",
      },
      {
        render_condition: true,
        url: "/series/filter",
        title: "Filter",
      },
    ],
    "es-AR": [
      {
        render_condition: true,
        url: "/series/popular",
        title: "Populares",
      },
      {
        render_condition: true,
        url: "/series/top-rated",
        title: "Mejor Valoradas",
      },
      {
        render_condition: true,
        url: "/series/on-the-air",
        title: "En Emisión",
      },
      {
        render_condition: true,
        url: "/series/airing-today",
        title: "Se Emiten Hoy",
      },
      {
        render_condition: true,
        url: "/series/filter",
        title: "Filtrar",
      },
    ],
    "fr-FR": [
      {
        render_condition: true,
        url: "/series/popular",
        title: "Populaires",
      },
      {
        render_condition: true,
        url: "/series/top-rated",
        title: "Les Mieux Notées",
      },
      {
        render_condition: true,
        url: "/series/on-the-air",
        title: "En Cours de Diffusion",
      },
      {
        render_condition: true,
        url: "/series/airing-today",
        title: "Diffusées Aujourd'hui",
      },
      {
        render_condition: true,
        url: "/series/filter",
        title: "Filtrer",
      },
    ],
  };
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {" "}
      <SearchBar submit_url="/series/search" />
      <NavBar
        navBarItems={
          navBarItemsByLanguage[language as keyof typeof navBarItemsByLanguage]
        }
      />
      {children}
    </div>
  );
}
