"use client";
import MoviesGrid from "@/components/movies/MoviesGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularMovies from "@/hooks/movies/usePopularMovies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PopularMoviesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Popular Movies",
    "es-AR": "Películas Populares",
    "fr-FR": "Films Populaires",
  };

  const { movies, actualPage, totalPages, isLoading, isError } =
    usePopularMovies({ page, language });

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
            baseUrl="/movies/popular?"
          >
            <MoviesGrid movies={movies} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function PopularMoviesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <PopularMoviesPage />
    </Suspense>
  );
}
