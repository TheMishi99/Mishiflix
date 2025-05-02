"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ApiMoviesResponseDTO, ErrorResponse } from "@/types/api-types";
import { Movie } from "@/types/movie-types";
import { useEffect, useState } from "react";

export default function usePopularMovies({
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
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=${language}&page=${page}`;
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
        const data: ApiMoviesResponseDTO = await response.json();
        setMovies(data.results);
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
    getMovies();
  }, [page, language]);

  // Devolvemos los datos
  return {
    movies,
    totalResults,
    actualPage,
    totalPages,
    isLoading,
    isError,
  };
}
