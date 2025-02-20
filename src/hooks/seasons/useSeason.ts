"use client";
import { getSeasonDetails } from "@/services/seasons.services";
import { DetailedSeason } from "@/types/season-types";
import { useEffect, useState } from "react";

export default function useSeason({
  series_id,
  season_number,
  language,
}: {
  series_id: number;
  season_number: number;
  language: string;
}): {
  season: DetailedSeason | null;
  isLoading: boolean;
  isError: string | null;
} {
  const [season, setSeason] = useState<DetailedSeason | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSeasonDetails = async () => {
      const [error, data] = await getSeasonDetails({
        series_id,
        season_number,
        language,
      });
      if (error) setIsError(error);
      if (data) setSeason(data);
      setIsLoading(false);
    };
    fetchSeasonDetails();
  }, [series_id, season_number, language]);
  return { season, isLoading, isError };
}
