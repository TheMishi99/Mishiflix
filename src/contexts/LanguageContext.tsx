"use client";
import { useState, useContext, createContext } from "react";

// Creamos un contexto para el idioma
const LanguageContext = createContext({
  language: "en-US",
  setLanguage: (language: string) => {},
});

// Creamos un provider para el idioma
export const LanguageProvider = ({
  children,
  defaultLanguage = "en-US",
}: {
  children: React.ReactNode;
  defaultLanguage?: string;
}) => {
  // Usamos el estado para guardar el idioma
  const [language, setLanguage] = useState(defaultLanguage);

  // Retornamos el provider con el contexto y el estado
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el idioma
export const useLanguage = () => useContext(LanguageContext);
