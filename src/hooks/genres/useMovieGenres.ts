"use client";
import { getMovieGenres } from "@/services/genres.services";
import { Genre } from "@/types/media-types";
import { useEffect, useState } from "react";

export default function useMovieGenres({ language }: { language: string }): {
  genres: Genre[];
  isError: string | null;
  isLoading: boolean;
} {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Obtenemos los géneros
        const [error, data] = await getMovieGenres({ language });

        // Si hay un error, lanzamos una excepción
        if (error) throw new Error(error);

        // Si hay datos, los guardamos en el estado
        if (data) setGenres(data.genres);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, [language]);

  // Retornamos los datos
  return { genres, isError, isLoading };
}
