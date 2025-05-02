"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse } from "@/types/api-types";
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
        // Preparamos la URL y las opciones de la petición
        const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=${language}`;
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
        const data: DetailedMovie = await response.json();
        setMovie(data);
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
