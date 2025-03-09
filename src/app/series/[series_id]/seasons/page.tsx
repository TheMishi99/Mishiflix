"use client";

import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeries from "@/hooks/series/useSeries";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SeriesDetailsSeasonsPage() {
  const { series_id } = useParams();
  const { language } = useLanguage();
  const {
    serie,
    isLoading: serieLoading,
    isError: serieError,
  } = useSeries({ series_id: Number(series_id), language });

  return (
    <div className="flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {serieLoading ? (
        <Spinner />
      ) : serieError ? (
        <p>{serieError}</p>
      ) : (
        serie && (
          <>
            <h2>Seasons: </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-2 gap-2">
              {serie.seasons.map((season) => (
                <li
                  key={season.id + season.name}
                  className="hover:scale-105 hover:border rounded-xl hover:border-red-600"
                >
                  <Link
                    href={`/series/${series_id}/seasons/${season.season_number}`}
                    className="flex flex-col justify-center items-center p-2 gap-2"
                  >
                    {season.poster_path && (
                      <img
                        src={
                          NEXT_PUBLIC_TMDB_IMAGES_PREFIX + season.poster_path
                        }
                        alt={season.name}
                      />
                    )}

                    <p>{season.name}</p>
                    <p>
                      <strong>Number of Episodes:</strong>{" "}
                      {season.episode_count}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}
