"use client";
import { Bebas_Neue } from "next/font/google";
import LanguageSelector from "../LanguageSelector";
import Link from "next/link";
import Image from "next/image";
import TmdbLogo from "../../../public/tmdb.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavbarItem } from "@/types/other-types";
import { useMemo, useState } from "react";
import Navbar from "../ui/Navbar";
import { Menu } from "lucide-react";
import UserMenu from "../auth/UserMenu";

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
});

const titlesByLanguage = {
  "en-US": {
    profile: "Profile",
    movies: "Movies",
    series: "Series",
    people: "People",
  },
  "es-AR": {
    profile: "Perfil",
    movies: "Películas",
    series: "Series",
    people: "Personas",
  },
  "fr-FR": {
    profile: "Profil",
    movies: "Films",
    series: "Séries",
    people: "Personnes",
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { language } = useLanguage();

  const navbarItems: NavbarItem[] = useMemo(
    () => [
      {
        id: 1,
        condition: true,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].movies,
        url: "/movies",
      },
      {
        id: 2,
        condition: true,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].series,
        url: "/series",
      },
      {
        id: 3,
        condition: true,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].people,
        url: "/people",
      },
    ],
    [language]
  );

  const handleTriggerButtonClick = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <header className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center border-b border-b-zinc-700">
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center p-2 gap-2">
        <div className="flex justify-center items-center p-2 gap-2">
          <Link
            className={`${bebasNeue.className} flex justify-center items-center p-2 bg-red-600 rounded-xl`}
            href="/"
          >
            <h1 className="text-4xl">MISHIFLIX</h1>
          </Link>
          <Link
            href="https://www.themoviedb.org"
            className="flex flex-shrink-0 p-2 bg-white rounded-xl"
            target="_blank"
          >
            <Image
              src={TmdbLogo}
              alt="TMDB Logo"
              width={40}
              height={40}
              className="aspect-square"
            />
          </Link>
        </div>
        <div className="hidden sm:flex justify-center items-center">
          <Navbar navbarItems={navbarItems} />
        </div>
        <div className="flex justify-center items-center">
          <LanguageSelector />
          <UserMenu />
        </div>
        <button
          type="button"
          className="flex sm:hidden justify-center items-center p-2 bg-zinc-800 rounded-xl"
          onClick={handleTriggerButtonClick}
        >
          <Menu color="white" />
        </button>
      </div>
      {isOpen && (
        <div className="w-full flex sm:hidden justify-center items-center">
          <Navbar navbarItems={navbarItems} direction="col" />
        </div>
      )}
    </header>
  );
}
