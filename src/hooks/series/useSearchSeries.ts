"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse, ApiSeriesResponseDTO } from "@/types/api-types";
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
        // Preparamos la URL y las opciones para la petición
        const url = `https://api.themoviedb.org/3/search/tv?include_adult=false&query=${term}&language=${language}&page=${page}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        };

        // Realizamos la petición
        const response = await fetch(url, options);

        // Si la respuesta no es correcta, lanzamos un error
        if (!response.ok) {
          const errorData: ErrorResponse = await response.json();
          throw new Error(errorData.status_message);
        }

        // Si todo ha ido bien, devolvemos los datos
        const data: ApiSeriesResponseDTO = await response.json();
        setSeries(data.results);
        setTotalResults(data.total_results);
        setActualPage(data.page);
        setTotalPages(data.total_pages);
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
