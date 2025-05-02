"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse, GenresDTO } from "@/types/api-types";
import { Genre } from "@/types/media-types";
import { useEffect, useState } from "react";

export default function useSeriesGenres({ language }: { language: string }): {
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
        // Preparamos la URL y las opciones para la petición
        const url = `https://api.themoviedb.org/3/genre/tv/list?language=${language}`;
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
        const data: GenresDTO = await response.json();
        setGenres(data.genres);
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
