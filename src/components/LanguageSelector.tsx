import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import React, { useState } from "react";

export default function LanguageSelector() {
  // Obtenemos el lenguaje actual y la función para cambiarlo
  const { language, setLanguage } = useLanguage();

  // Definimos el estado para controlar si el menú de idiomas está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Función para el evento de click para cambiar el idioma
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setIsOpen(false);
  };

  // Definimos las opciones de idioma
  const options = [
    { value: "en-US", label: "English", img: "/united-states-flag.svg" },
    { value: "es-AR", label: "Español", img: "/spain-flag.svg" },
    { value: "fr-FR", label: "Français", img: "/france-flag.svg" },
  ];

  // Mostramos el selector de idioma
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div
          className="w-32 border border-zinc-800 bg-zinc-900 rounded-lg p-2 shadow-md flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={options.find((opt) => opt.value === language)!.img}
            alt={language}
            className="mr-2"
            width={20}
            height={20}
          />
          {options.find((opt) => opt.value === language)?.label}
        </div>
        {isOpen && (
          <div className="absolute mt-2 border border-zinc-800 rounded-lg shadow-md w-full z-10 bg-zinc-900">
            {options.map((option) => (
              <div
                key={option.value}
                className="p-2 flex items-center cursor-pointer hover:bg-zinc-800"
                onClick={() => handleLanguageChange(option.value)}
              >
                <Image
                  src={option.img}
                  alt={option.label}
                  className="mr-2"
                  width={20}
                  height={20}
                />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
