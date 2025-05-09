"use client";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownItem } from "@/types/other-types";
import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Dropdown from "../ui/Dropdown";
import { User } from "lucide-react";
import Avatar from "../ui/Avatar";

const titlesByLanguage = {
  "en-US": {
    login: "Login",
    signUp: "Sign Up",
    profile: "Profile",
    logout: "Logout",
  },
  "es-AR": {
    login: "Iniciar sesión",
    signUp: "Registrarse",
    profile: "Profile",
    logout: "Cerrar sesión",
  },
  "fr-FR": {
    login: "S'identifier",
    signUp: "S'inscrire",
    profile: "Profile",
    logout: "Se deconnecter",
  },
};

export default function UserMenu() {
  const { userLogged, logout } = useAuth();
  const { language } = useLanguage();

  const dropdownItems: DropdownItem[] = useMemo(
    () => [
      {
        id: 1,
        condition: !userLogged,
        type: "link",
        content:
          titlesByLanguage[language as keyof typeof titlesByLanguage].login,
        url: "/auth/login",
      },
      {
        id: 2,
        condition: !userLogged,
        type: "link",
        content:
          titlesByLanguage[language as keyof typeof titlesByLanguage].signUp,
        url: "/auth/sign-up",
      },
      {
        id: 3,
        condition: userLogged !== null,
        type: "link",
        content:
          titlesByLanguage[language as keyof typeof titlesByLanguage].profile,
        url: "/auth/profile",
      },
      {
        id: 4,
        condition: userLogged !== null,
        type: "button",
        content:
          titlesByLanguage[language as keyof typeof titlesByLanguage].logout,
        onClick: async () => {
          await logout();
        },
      },
    ],
    [language, userLogged]
  );

  return (
    <div className="flex justify-center items-center">
      <Dropdown
        triggerContent={
          userLogged ? (
            <>
              <Avatar
                src={`/${userLogged.avatar}`}
                alt={userLogged.username}
                className="size-6"
              />
              <span>{userLogged.username}</span>
            </>
          ) : (
            <User color="white" className="size-6" />
          )
        }
        dropdownItems={dropdownItems}
      />
    </div>
  );
}
