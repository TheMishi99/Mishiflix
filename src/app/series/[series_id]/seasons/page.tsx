"use client";

import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeries from "@/hooks/series/useSeries";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SeriesDetailsSeasonsPage() {
  const { series_id } = useParams();
  const { language } = useLanguage();
  const {
    series,
    isLoading: seriesLoading,
    isError: seriesError,
  } = useSeries({ series_id: Number(series_id), language });

  if (seriesLoading) return <Spinner />;
  if (seriesError) return <p>{seriesError}</p>;
  if (!series) return <p>No series found</p>;
  return (
    <>
      <h3 className="text-xl">Seasons: </h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-2 gap-2">
        {series.seasons.map((season) => (
          <li
            key={season.id + season.name}
            className="border border-zinc-800 rounded-xl hover:border-red-600"
          >
            <Link
              href={`/series/${series_id}/seasons/${season.season_number}`}
              className="flex flex-col justify-center items-center p-2 gap-2"
            >
              {season.poster_path && (
                <Image
                  src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + season.poster_path}
                  alt={season.name}
                  width={100000}
                  height={100000}
                  className="w-48 aspect-[2/3]"
                />
              )}

              <p>{season.name}</p>
              <p>
                <strong>Number of Episodes:</strong> {season.episode_count}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
