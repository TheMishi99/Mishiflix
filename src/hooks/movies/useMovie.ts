"use client";
import { getMovieDetails } from "@/services/movies.services";
import { DetailedMovie } from "@/types/movie-types";
import { useEffect, useState } from "react";

export default function useMovie({
  movie_id,
  language,
}: {
  movie_id: number;
  language: string;
}): {
  movie: DetailedMovie | null;
  isLoading: boolean;
  isError: string | null;
} {
  const [movie, setMovie] = useState<DetailedMovie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    const getMovie = async () => {
      try {
        // Obtenemos los datos de la película
        const [error, data] = await getMovieDetails({
          movie_id,
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
    getMovie();
  }, [movie_id, language]);

  // Devolvemos los datos
  return { movie, isLoading, isError };
}
