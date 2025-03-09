"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import NavBar from "./NavBar";
import { NavBarItem } from "@/types/other-types";
import { useUserLogged } from "@/contexts/UserLoggedContext";

export default function MainNavBar() {
  const { language } = useLanguage();
  const { userLogged } = useUserLogged();
  const navBarItemsByLanguage: { [key: string]: NavBarItem[] } = {
    "en-US": [
      {
        render_condition: userLogged !== null,
        title: "Movies",
        url: "/movies",
      },
      {
        render_condition: userLogged !== null,
        title: "Series",
        url: "/series",
      },
      {
        render_condition: userLogged !== null,
        title: "People",
        url: "/people",
      },
    ],
    "es-AR": [
      {
        render_condition: userLogged !== null,
        title: "Películas",
        url: "/movies",
      },
      {
        render_condition: userLogged !== null,
        title: "Series",
        url: "/series",
      },
      {
        render_condition: userLogged !== null,
        title: "Personas",
        url: "/people",
      },
    ],
    "fr-FR": [
      { render_condition: userLogged !== null, title: "Films", url: "/movies" },
      {
        render_condition: userLogged !== null,
        title: "Séries",
        url: "/series",
      },
      {
        render_condition: userLogged !== null,
        title: "Personnes",
        url: "/people",
      },
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
