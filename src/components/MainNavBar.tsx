"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import NavBar from "./NavBar";
import { NavBarItem } from "@/types/other-types";

export default function MainNavBar() {
  const { language } = useLanguage();
  const navBarItemsByLanguage: { [key: string]: NavBarItem[] } = {
    "en-US": [
      { render_condition: true, title: "Movies", url: "/movies" },
      { render_condition: true, title: "Series", url: "/series" },
      { render_condition: true, title: "People", url: "/people" },
    ],
    "es-AR": [
      { render_condition: true, title: "Películas", url: "/movies" },
      { render_condition: true, title: "Series", url: "/series" },
      { render_condition: true, title: "Personas", url: "/people" },
    ],
    "fr-FR": [
      { render_condition: true, title: "Films", url: "/movies" },
      { render_condition: true, title: "Séries", url: "/series" },
      { render_condition: true, title: "Personnes", url: "/people" },
    ],
  };
  return (
    <NavBar
      navBarItems={
        navBarItemsByLanguage[language as keyof typeof navBarItemsByLanguage]
      }
    />
  );
}
