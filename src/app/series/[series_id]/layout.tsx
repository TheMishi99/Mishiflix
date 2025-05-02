"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeries from "@/hooks/series/useSeries";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function SeriesDetailsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { series_id } = useParams();
  const { language } = useLanguage();
  const { series } = useSeries({
    series_id: Number(series_id),
    language,
  });
  return (
    <div className="w-full flex flex-col justify-start items-center gap-2">
      {series && (
        <Link href={`/series/${series_id}`} className="text-2xl">
          {series.name}
        </Link>
      )}
      {children}
    </div>
  );
}
