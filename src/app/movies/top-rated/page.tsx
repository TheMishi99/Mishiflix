"use client";
import MoviesGrid from "@/components/movies/MoviesGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useTopRatedMovies from "@/hooks/movies/useTopRatedMovies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function TopRatedMoviesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Top Rated Movies",
    "es-AR": "Películas Mejor Valoradas",
    "fr-FR": "Films Les Mieux Notés",
  };

  const { movies, actualPage, totalPages, isLoading, isError } =
    useTopRatedMovies({ page, language });

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

export default function TopRatedMoviesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <TopRatedMoviesPage />
    </Suspense>
  );
}
