"use client";
import { getOnTheAirSeriesList } from "@/services/series.services";
import { Series } from "@/types/series-types";
import { useEffect, useState } from "react";

export default function useOnTheAirSeries({
  page,
  language,
}: {
  page: number;
  language: string;
}): {
  actualPage: number;
  totalPages: number;
  series: Series[];
  totalResults: number;
  isLoading: boolean;
  isError: string | null;
} {
  const [actualPage, setActualPage] = useState<number>(page);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [series, setSeries] = useState<Series[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnTheAirSeries = async () => {
      try {
        // Obtener las películas próximas a estrenarse
        const [error, data] = await getOnTheAirSeriesList({ page, language });

        // Si hay un error, lanzar una excepción
        if (error) throw new Error(error);

        // Si hay datos, actualizar el estado de las películas
        if (data) {
          setSeries(data.results);
          setTotalResults(data.total_results);
          setActualPage(data.page);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOnTheAirSeries();
  }, [page, language]);

  // Devolver el estado actual
  return {
    actualPage,
    totalPages,
    series,
    totalResults,
    isLoading,
    isError,
  };
}
