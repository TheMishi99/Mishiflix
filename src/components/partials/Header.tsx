"use client";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar";
import LanguageSelector from "../LanguageSelector";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import { useLanguage } from "@/contexts/LanguageContext";

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

  return (
    <header className="flex flex-col sm:flex-row justify-center items-center gap-2 border-b border-b-zinc-700">
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center p-2 gap-2">
        <Link
          id="logo"
          className="flex justify-center items-center p-2 bg-red-600 rounded-xl"
          href="/"
        >
          <h1 className="text-2xl">MISHIFLIX</h1>
        </Link>
        <SearchBar />
      </div>
      <div className="w-full flex justify-between sm:justify-end items-center p-2 gap-2">
        <LanguageSelector />
        <nav className="flex justify-center items-center">
          <ul className="flex justify-center items-center p-2 gap-2">
            {userLogged ? (
              <li>
                <Link
                  href="/auth/profile"
                  className="flex justify-center items-center p-2 gap-2 border border-zinc-800 rounded-xl"
                >
                  <Image
                    src={userLogged.avatar}
                    alt={userLogged.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{userLogged.username}</span>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="bg-zinc-500 hover:bg-zinc-400 transition-all rounded-xl p-2"
                  >
                    {
                      titlesByLanguage[
                        language as keyof typeof titlesByLanguage
                      ].login
                    }
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/sign-up"
                    className="bg-zinc-800 hover:bg-zinc-700 transition-all rounded-xl p-2"
                  >
                    {
                      titlesByLanguage[
                        language as keyof typeof titlesByLanguage
                      ].signUp
                    }
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
