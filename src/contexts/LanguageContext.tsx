"use client";
import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

// Creamos un contexto para el idioma
const LanguageContext = createContext<{
  language: string;
  loading: boolean;
  setLanguage: Dispatch<SetStateAction<string>>;
}>({
  language: "en-US",
  loading: true,
  setLanguage: () => {},
});

// Creamos un provider para el idioma
export const LanguageProvider = ({
  children,
  defaultLanguage = "en-US",
}: Readonly<{
  children: ReactNode;
  defaultLanguage?: string;
}>) => {
  // Usamos el estado para guardar el idioma
  const [language, setLanguage] = useState(defaultLanguage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Retornamos el provider con el contexto y el estado
  return (
    <LanguageContext.Provider value={{ language, loading, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el idioma
export const useLanguage = () => useContext(LanguageContext);
