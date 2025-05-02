"use client";

import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeason from "@/hooks/seasons/useSeason";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SerieDetailsSeasonDetailsPage() {
  const { series_id, season_number } = useParams();
  const { language } = useLanguage();
  const {
    season,
    isLoading: seasonLoading,
    isError: seasonError,
  } = useSeason({
    series_id: Number(series_id),
    season_number: Number(season_number),
    language,
  });
  if (seasonLoading) return <Spinner />;
  if (seasonError) return <p>{seasonError}</p>;
  if (!season) return <p>Season not found</p>;
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
      <div className="flex justify-center items-center">
        <img
          src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + season.poster_path}
          alt={season.name}
        />
      </div>
      <div className="w-full sm:w-2/3 flex flex-col justify-center items-center p-2 gap-2">
        <p className="w-full">
          <strong>Air Date</strong>: {season.air_date}
        </p>
        <p className="w-full">
          <strong>Overview</strong>: {season.overview}
        </p>
        <p className="w-full">
          <strong>Vote Average</strong>: {season.vote_average}
        </p>
        <Link
          href={`/series/${series_id}/seasons/${season_number}/episodes`}
          className="bg-red-600 p-2 rounded-xl"
        >
          See Episodes
        </Link>
      </div>
    </div>
  );
}
