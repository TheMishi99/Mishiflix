"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse, ApiSeriesResponseDTO } from "@/types/api-types";
import { Series } from "@/types/series-types";
import { useEffect, useState } from "react";

export default function useFilteredSeries({
  page,
  language,
  genres,
  sortBy,
  order,
}: {
  page: number;
  language: string;
  genres: number[];
  sortBy: string;
  order: string;
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
    const fetchFilteredSeries = async () => {
      try {
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=${page}&sort_by=${sortBy}.${order}&with_genres=${genres.join(
          "%2C"
        )}`;
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
    fetchFilteredSeries();
  }, [page, language, genres, sortBy, order]);

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
