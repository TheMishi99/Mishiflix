"use client";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeason from "@/hooks/seasons/useSeason";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SeriesDetailsSeasonDetailsEpisodesPage() {
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
    <>
      <h4>Episodes:</h4>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {season.episodes.map((episode) => (
          <li
            key={episode.id + episode.name}
            className="border border-zinc-800 rounded-xl hover:border-red-600"
          >
            <Link
              href={`/series/${series_id}/seasons/${season_number}/episodes/${episode.episode_number}`}
              className="flex flex-col justify-center items-center p-2 gap-2"
            >
              <Image
                src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + episode.still_path}
                alt={episode.id + episode.name}
                width={100000}
                height={100000}
                className="w-48 aspect-[2/3]"
              />
              <p>
                {episode.episode_number} - {episode.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
