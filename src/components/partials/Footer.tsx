"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const titlesByLanguage = {
  "en-US": {
    title: "Copyright 2025 Mishiflix. All rights reserved.",
    subtitle:
      "This product uses the TMDb API but is not endorsed or certified by TMDb.",
  },
  "es-AR": {
    title: "Copyright 2025 Mishiflix. Todos los derechos reservados.",
    subtitle:
      "Este producto utiliza la API de TMDb, pero no está aprobado o certificado por TMDb.",
  },
  "fr-FR": {
    title: "Copyright 2025 Mishiflix. Tous droits réservés.",
    subtitle:
      "Ce produit utilise l'API de TMDb, mais n'est pas approuvé ou certifié par TMDb.",
  },
};
export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="flex flex-col items-center justify-center border-t border-t-zinc-700 p-2 text-center">
      <p className="">
        {titlesByLanguage[language as keyof typeof titlesByLanguage].title}
      </p>
      <p className="">
        {titlesByLanguage[language as keyof typeof titlesByLanguage].subtitle}
      </p>
    </footer>
  );
}
