"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import useEpisode from "@/hooks/episodes/useEpisode";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function SeriesSeasonEpisodeDetailsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { language } = useLanguage();
  const { series_id, season_number, episode_number } = useParams();
  const { episode } = useEpisode({
    series_id: Number(series_id),
    season_number: Number(season_number),
    episode_number: Number(episode_number),
    language,
  });
  return (
    <div className="flex flex-col justify-center items-center p-2 gap-2">
      {episode && (
        <Link
          href={`/series/${series_id}/seasons/${season_number}/episodes/${episode.episode_number}`}
        >
          {episode.episode_number} - {episode.name}
        </Link>
      )}
      {children}
    </div>
  );
}
