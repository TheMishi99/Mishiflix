"use client";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useEpisode from "@/hooks/episodes/useEpisode";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  return (
    <div className="h-dvh flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {episodeLoading ? (
        <Spinner />
      ) : episodeError ? (
        <p>{episodeError}</p>
      ) : (
        episode && (
          <div className="flex flex-col justify-center items-center p-2 gap-2">
            <div className="flex flex-col justify-center items-center p-2 gap-2">
              <img
                src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + episode.still_path}
                alt={episode.id + episode.name}
              />
              <h2 className="text-2xl">{episode.name}</h2>
            </div>
            <div className="flex flex-col justify-center items-center p-2 gap-2">
              <p>
                <strong>Air Date</strong>: {episode.air_date}
              </p>
              <p>
                <strong>Overview</strong>: {episode.overview}
              </p>
              <p>
                <strong>Vote Average</strong>: {episode.vote_average}
              </p>
              <p>
                <strong>Guest Stars</strong>:{" "}
                {episode.guest_stars.reduce<React.ReactNode[]>(
                  (acc, guest_star, index) => {
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
                  },
                  []
                )}
              </p>
              <p>
                <strong>Crew</strong>:{" "}
                {episode.crew.map((cr) => cr.name).join(", ")}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
