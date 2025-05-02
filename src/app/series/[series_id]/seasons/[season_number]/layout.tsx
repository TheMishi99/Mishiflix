"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeason from "@/hooks/seasons/useSeason";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function SeriesSeasonDetailsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { language } = useLanguage();
  const { series_id, season_number } = useParams();
  const { season } = useSeason({
    series_id: Number(series_id),
    season_number: Number(season_number),
    language,
  });
  return (
    <div className="w-full flex flex-col justify-start items-center gap-2">
      {season && (
        <Link
          href={`/series/${series_id}/seasons/${season_number}`}
          className="text-xl"
        >
          {season.name}
        </Link>
      )}
      {children}
    </div>
  );
}
