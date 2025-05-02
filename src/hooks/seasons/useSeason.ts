"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse } from "@/types/api-types";
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
      try {
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?language=${language}`;
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
        const data: DetailedSeason = await response.json();
        setSeason(data);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeasonDetails();
  }, [series_id, season_number, language]);
  return { season, isLoading, isError };
}
