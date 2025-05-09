"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const presentationByLanguage = {
  "en-US": {
    title: "Welcome to Mishiflix! Watch your favorite movies and TV shows.",
    subtitle: "Please login or sign up to start watching.",
  },
  "es-AR": {
    title: "Bienvenido a Mishiflix! Mira tus películas y series favoritas.",
    subtitle: "Por favor inicia sesión o regístrate para comenzar a ver.",
  },
  "fr-FR": {
    title: "Bienvenue sur Mishiflix! Regardez vos films et séries préférés.",
    subtitle: "Veuillez vous connecter ou inscrire pour commencer à regarder.",
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className="text-xl text-center">
        {
          presentationByLanguage[
            language as keyof typeof presentationByLanguage
          ].title
        }
      </h2>
      <p className="text-center">
        {
          presentationByLanguage[
            language as keyof typeof presentationByLanguage
          ].subtitle
        }
      </p>
    </div>
  );
}
