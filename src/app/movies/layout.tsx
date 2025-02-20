"use client";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavBarItem } from "@/types/other-types";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const navBarItemsByLanguage: { [key: string]: NavBarItem[] } = {
    "en-US": [
      { render_condition: true, url: "/movies/popular", title: "Popular" },
      {
        render_condition: true,
        url: "/movies/top-rated",
        title: "Top Rated",
      },
      {
        render_condition: true,
        url: "/movies/now-playing",
        title: "Now Playing",
      },
      {
        render_condition: true,
        url: "/movies/upcoming",
        title: "Upcoming",
      },
      {
        render_condition: true,
        url: "/movies/filter",
        title: "Filter",
      },
    ],
    "es-AR": [
      { render_condition: true, url: "/movies/popular", title: "Popular" },
      {
        render_condition: true,
        url: "/movies/top-rated",
        title: "Mejor Valoradas",
      },
      {
        render_condition: true,
        url: "/movies/now-playing",
        title: "En Cartelera",
      },
      {
        render_condition: true,
        url: "/movies/upcoming",
        title: "Próximos Estrenos",
      },
      {
        render_condition: true,
        url: "/movies/filter",
        title: "Filtrar",
      },
    ],
    "fr-FR": [
      { render_condition: true, url: "/movies/popular", title: "Populaires" },
      {
        render_condition: true,
        url: "/movies/top-rated",
        title: "Les Mieux Notés",
      },
      {
        render_condition: true,
        url: "/movies/now-playing",
        title: "À l'Affiche",
      },
      {
        render_condition: true,
        url: "/movies/upcoming",
        title: "À Venir",
      },
      {
        render_condition: true,
        url: "/movies/filter",
        title: "Filtrer",
      },
    ],
  };
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      <SearchBar submit_url="/movies/search" />
      <NavBar
        navBarItems={
          navBarItemsByLanguage[language as keyof typeof navBarItemsByLanguage]
        }
      />
      {children}
    </div>
  );
}
