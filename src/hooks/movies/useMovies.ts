"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ApiMoviesResponseDTO, ErrorResponse } from "@/types/api-types";
import { Movie } from "@/types/movie-types";
import { useEffect, useState } from "react";

export default function useMovies({
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
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=${language}&page=${page}`;
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
        setActualPage(data.page);
        setTotalResults(data.total_results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [term, page, language]);

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
