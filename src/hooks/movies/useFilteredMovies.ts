"use client";
import { getFilteredMovies } from "@/services/movies.services";
import { Movie } from "@/types/movie-types";
import { useEffect, useState } from "react";

export default function useFilteredMovies({
  page,
  language,
  genres,
  order_by,
  order,
}: {
  page: number;
  language: string;
  genres: number[];
  order_by: string;
  order: string;
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
    const fetchMovies = async () => {
      try {
        // Obtenemos las películas filtradas
        const [error, data] = await getFilteredMovies({
          genres,
          page,
          language,
          order_by,
          order,
        });

        // Si hay un error, lanzamos una excepción
        if (error) throw new Error(error);

        // Si hay datos, los guardamos
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
    fetchMovies();
  }, [page, language, genres, order_by, order]);

  // Devolvemos los datos
  return {
    actualPage,
    totalPages,
    movies,
    totalResults,
    isLoading,
    isError,
  };
}
