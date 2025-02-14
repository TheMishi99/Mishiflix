import { getMovies } from "@/services/movies.services";
import { Movie } from "@/types/my-types";
import { useEffect, useState } from "react";

export default function useMovies({
  title,
  page,
  language,
}: {
  title: string;
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
        // Obtenemos las películas
        const [error, data] = await getMovies({ title, page, language });

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
    fetchMovies();
  }, [title, page, language]);

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
