import { getPopularMovies } from "@/services/movies.services";
import { Movie } from "@/types/my-types";
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
        // Obtenemos las películas populares
        const [error, data] = await getPopularMovies({ page, language });

        // Si hay un error, lanzamos una excepción
        if (error) throw new Error(error);

        // Si hay datos, los guardamos en el estado
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
