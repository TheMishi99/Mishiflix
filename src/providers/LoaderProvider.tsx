"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

export default function LoaderProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { loading: languageLoading } = useLanguage();
  const { loading: authLoading } = useAuth();
  if (languageLoading || authLoading)
    return (
      <div className="min-h-dvh flex justify-center items-center ">
        <Loader className="animate-spin" />
      </div>
    );
  return children;
}
