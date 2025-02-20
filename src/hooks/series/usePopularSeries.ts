"use client";
import { getPopularSeriesList } from "@/services/series.services";
import { Series } from "@/types/series-types";
import { useEffect, useState } from "react";

export default function usePopularSeries({
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
    const getSeries = async () => {
      try {
        // Obtenemos las películas populares
        const [error, data] = await getPopularSeriesList({ page, language });

        // Si hay un error, lanzamos una excepción
        if (error) throw new Error(error);

        // Si hay datos, los guardamos en el estado
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
    getSeries();
  }, [page, language]);

  // Devolvemos los datos
  return {
    series,
    totalResults,
    actualPage,
    totalPages,
    isLoading,
    isError,
  };
}
