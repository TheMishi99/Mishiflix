"use client";
import { getSeriesDetails } from "@/services/series.services";
import { DetailedSerie } from "@/types/series-types";
import { useEffect, useState } from "react";

export default function useSeries({
  series_id,
  language,
}: {
  series_id: number;
  language: string;
}): {
  serie: DetailedSerie | null;
  isLoading: boolean;
  isError: string | null;
} {
  const [serie, setMovie] = useState<DetailedSerie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSerie = async () => {
      try {
        // Obtenemos los datos de la película
        const [error, data] = await getSeriesDetails({
          series_id: series_id,
          language,
        });

        // Si hay un error, lanzamos una excepción
        if (error) throw new Error(error);

        // Si hay datos, los guardamos en el estado
        if (data) {
          setMovie(data);
        }
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
  return { serie, isLoading, isError };
}
