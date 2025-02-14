"use client";
import MovieCard from "@/components/movies/MovieCard";
import PageButtons from "@/components/movies/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useUpcomingMovies from "@/hooks/movies/useUpcomingMovies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpcomingMoviesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Upcoming Movies",
    "es-AR": "Próximos Estrenos",
    "fr-FR": "Prochaines Sorties",
  };

  const { movies, actualPage, totalPages, isLoading, isError } =
    useUpcomingMovies({ page, language });

  useEffect(() => {
    setPage(Number(params.get("page")) || 1);
  }, [params]);

  return (
    <div className="flex flex-col justify-start items-center p-2 overflow-y-scroll">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        <>
          <h2>{titlesByLanguage[language as keyof typeof titlesByLanguage]}</h2>
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl="/movies/upcoming?"
          />
          <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
            {movies.map((movie) => (
              <li
                key={movie.id + movie.title}
                className="group overflow-hidden rounded-xl group bg-gray-800 relative"
              >
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl="/movies/upcoming?"
          />
        </>
      )}
    </div>
  );
}
