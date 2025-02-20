"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SearchBar({ submit_url }: { submit_url: string }) {
  // Obtenemos el lenguaje actual
  const { language } = useLanguage();

  // Definimos un objeto que mapea el idioma con el texto del botón
  const searchButtonByLanguage = {
    "en-US": "Search",
    "es-AR": "Buscar",
    "fr-FR": "Rechercher",
  };
  return (
    <form
      action={submit_url}
      className="w-full max-w-[400px] flex justify-center items-center p-2 gap-2"
    >
      <input
        type="search"
        name="term"
        id="term"
        className="w-full p-2 rounded-xl bg-zinc-800"
      />
      <button className="p-2 bg-red-600 rounded-xl">
        {
          searchButtonByLanguage[
            language as keyof typeof searchButtonByLanguage
          ]
        }
      </button>
    </form>
  );
}
