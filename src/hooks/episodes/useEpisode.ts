"use client";
import { getEpisodeDetails } from "@/services/episodes.services";
import { DetailedEpisode } from "@/types/episode-types";
import { useEffect, useState } from "react";

export default function useEpisode({
  series_id,
  season_number,
  episode_number,
  language,
}: {
  series_id: number;
  season_number: number;
  episode_number: number;
  language: string;
}): {
  episode: DetailedEpisode | null;
  isLoading: boolean;
  isError: string | null;
} {
  const [episode, setEpisode] = useState<DetailedEpisode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      const [error, data] = await getEpisodeDetails({
        series_id,
        season_number,
        episode_number,
        language,
      });
      if (error) setIsError(error);
      if (data) setEpisode(data);
      setIsLoading(false);
    };
    fetchEpisodeDetails();
  }, [series_id, season_number, episode_number, language]);

  return { episode, isLoading, isError };
}
