"use client";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useEpisode from "@/hooks/episodes/useEpisode";
import useSeason from "@/hooks/seasons/useSeason";
import useSeries from "@/hooks/series/useSeries";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function SeriesDetailsSeasonDetailsEpisodeDetailsPage() {
  const { series_id, season_number, episode_number } = useParams();
  const { language } = useLanguage();
  const {
    episode,
    isLoading: episodeLoading,
    isError: episodeError,
  } = useEpisode({
    series_id: Number(series_id),
    season_number: Number(season_number),
    episode_number: Number(episode_number),
    language,
  });

  if (episodeLoading) return <Spinner />;
  if (episodeError) return <p>{episodeError}</p>;
  if (!episode) return <p>Episode not found</p>;
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center p-2 gap-2">
        <img
          src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + episode.still_path}
          alt={episode.id + episode.name}
        />
      </div>
      <div className="w-full sm:w-2/3 flex flex-col justify-center items-center p-2 gap-2">
        <p className="w-full">
          <strong>Air Date</strong>: {episode.air_date}
        </p>
        <p className="w-full">
          <strong>Overview</strong>: {episode.overview}
        </p>
        <p className="w-full">
          <strong>Vote Average</strong>: {episode.vote_average}
        </p>
        <p className="w-full">
          <strong>Guest Stars</strong>:{" "}
          {episode.guest_stars.reduce<ReactNode[]>((acc, guest_star, index) => {
            acc.push(
              <Link
                key={guest_star.id + guest_star.name}
                href={`/people/${guest_star.id}`}
                className="text-red-600"
              >
                {guest_star.name}
              </Link>
            );
            if (index < episode.guest_stars.length - 1) {
              acc.push(", ");
            }
            return acc;
          }, [])}
        </p>
        <p className="w-full">
          <strong>Crew</strong>: {episode.crew.map((cr) => cr.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
