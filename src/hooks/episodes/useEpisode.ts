"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse } from "@/types/api-types";
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
      try {
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}?language=${language}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        };

        // Realizamos la petición
        const response = await fetch(url, options);

        // Si la petición no fue exitosa, lanzamos un error
        if (!response.ok) {
          const errorData: ErrorResponse = await response.json();
          throw new Error(errorData.status_message);
        }

        // Si la petición fue exitosa, obtenemos los datos y los retornamos
        const data: DetailedEpisode = await response.json();
        setEpisode(data);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEpisodeDetails();
  }, [series_id, season_number, episode_number, language]);

  return { episode, isLoading, isError };
}
