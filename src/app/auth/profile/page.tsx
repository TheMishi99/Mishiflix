"use client";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { ReactNode } from "react";

const titlesByLanguage = {
  "en-US": {
    favoriteMovies: "Favorite Movies",
    favoriteSeries: "Favorite Series",
  },
  "es-AR": {
    favoriteMovies: "Peliculas Favoritas",
    favoriteSeries: "Series Favoritas",
  },
  "fr-FR": {
    favoriteMovies: "Films Favoris",
    favoriteSeries: "Séries Favoris",
  },
};

export default function ProfilePage() {
  const { userLogged } = useAuth();
  const { language } = useLanguage();

  return (
    <div
      id="profile"
      className="flex flex-col sm:flex-row justify-center items-center p-2 gap-2 bg-zinc-900 rounded-xl"
    >
      {userLogged && (
        <div className="flex flex-col justify-center items-center p-2 gap-2">
          <Avatar
            src={userLogged.avatar}
            alt={userLogged.username}
            className="size-32"
          />
          <p>{userLogged.username}</p>
        </div>
      )}
    </div>
  );
}
