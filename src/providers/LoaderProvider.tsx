"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Spinner from "@/components/Spinner";
import { ReactNode } from "react";

export default function LoaderProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { loading: languageLoading } = useLanguage();
  const { loading: authLoading } = useAuth();
  if (languageLoading || authLoading) return <Spinner />;
  return children;
}
