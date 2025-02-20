"use client";
import { getUpcomingMovies } from "@/services/movies.services";
import { Movie } from "@/types/movie-types";
import { useEffect, useState } from "react";

export default function useUpcomingMovies({
  page,
  language,
}: {
  page: number;
  language: string;
}): {
  actualPage: number;
  totalPages: number;
  movies: Movie[];
  totalResults: number;
  isLoading: boolean;
  isError: string | null;
} {
  const [actualPage, setActualPage] = useState<number>(page);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        // Obtener las películas próximas a estrenarse
        const [error, data] = await getUpcomingMovies({ page, language });

        // Si hay un error, lanzar una excepción
        if (error) throw new Error(error);

        // Si hay datos, actualizar el estado de las películas
        if (data) {
          setMovies(data.results);
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
    getMovies();
  }, [page, language]);

  // Devolver el estado actual
  return {
    actualPage,
    totalPages,
    movies,
    totalResults,
    isLoading,
    isError,
  };
}
