"use client";
import { getSeriesList } from "@/services/series.services";
import { Series } from "@/types/series-types";
import { useEffect, useState } from "react";

export default function useSearchSeries({
  term,
  page,
  language,
}: {
  term: string;
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
    const fetchSeries = async () => {
      try {
        // Obtenemos las películas
        const [error, data] = await getSeriesList({
          term: term,
          page,
          language,
        });

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
    fetchSeries();
  }, [term, page, language]);

  // Devolvemos los datos
  return {
    actualPage,
    totalPages,
    series,
    totalResults,
    isLoading,
    isError,
  };
}
