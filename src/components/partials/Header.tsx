"use client";
import LanguageSelector from "../LanguageSelector";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import { useLanguage } from "@/contexts/LanguageContext";
import NavBar from "../NavBar";
import { NavBarItem } from "@/types/other-types";
import Link from "next/link";

export default function Header() {
  const { userLogged } = useUserLogged();
  const { language } = useLanguage();

  const titlesByLanguage = {
    "en-US": {
      login: "Login",
      signUp: "Sign Up",
    },
    "es-AR": {
      login: "Iniciar sesión",
      signUp: "Registrarse",
    },
    "fr-FR": {
      login: "S'identifier",
      signUp: "S'inscrire",
    },
  };

  const navBarItems: NavBarItem[] = [
    {
      render_condition: userLogged != null,
      title: (
        <div className="flex justify-center items-center p-2 gap-2">
          {userLogged && (
            <>
              <img
                src={userLogged.avatar}
                alt={userLogged.username}
                className="size-10 rounded-full"
              />
              <span>{userLogged.username}</span>
            </>
          )}
        </div>
      ),
      url: "/auth/profile",
    },
    {
      render_condition: !userLogged,
      title: titlesByLanguage[language as keyof typeof titlesByLanguage].login,
      url: "/auth/login",
    },
    {
      render_condition: !userLogged,
      title: titlesByLanguage[language as keyof typeof titlesByLanguage].signUp,
      url: "/auth/sign-up",
    },
  ];

  return (
    <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center p-2 gap-2 border-b border-b-zinc-700">
      <div className="flex justify-center sm:justify-start items-center p-2 gap-2">
        <Link
          id="logo"
          className="flex justify-center items-center p-2 bg-red-600 rounded-xl"
          href="/"
        >
          <h1 className="text-3xl">MISHIFLIX</h1>
        </Link>
      </div>
      <div className="flex justify-end items-center p-2 gap-2">
        <LanguageSelector />
        <NavBar navBarItems={navBarItems} />
      </div>
    </header>
  );
}
