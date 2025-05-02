"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse } from "@/types/api-types";
import { DetailedSerie } from "@/types/series-types";
import { useEffect, useState } from "react";

export default function useSeries({
  series_id,
  language,
}: {
  series_id: number;
  language: string;
}): {
  series: DetailedSerie | null;
  isLoading: boolean;
  isError: string | null;
} {
  const [series, setSeries] = useState<DetailedSerie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSerie = async () => {
      try {
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/tv/${series_id}?language=${language}`;
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
        const data: DetailedSerie = await response.json();
        setSeries(data);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSerie();
  }, [series_id, language]);

  // Devolvemos los datos
  return { series, isLoading, isError };
}
