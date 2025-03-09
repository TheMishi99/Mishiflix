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
  return (
    <div className="flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {seasonLoading ? (
        <Spinner />
      ) : seasonError ? (
        <p></p>
      ) : (
        season && (
          <>
            <div className="flex flex-col justify-center items-center p-2 gap-2">
              <img
                src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + season.poster_path}
                alt={season.name}
              />
              <h2 className="text-2xl">{season.name}</h2>
            </div>
            <div className="flex flex-col justify-center items-center p-2 gap-2">
              <p>
                <strong>Air Date</strong>: {season.air_date}
              </p>
              <p>
                <strong>Overview</strong>: {season.overview}
              </p>
              <p>
                <strong>Vote Average</strong>: {season.vote_average}
              </p>
              <Link
                href={`/series/${series_id}/seasons/${season_number}/episodes`}
                className="bg-red-600 p-2 rounded-xl"
              >
                See Episodes
              </Link>
            </div>
          </>
        )
      )}
    </div>
  );
}
