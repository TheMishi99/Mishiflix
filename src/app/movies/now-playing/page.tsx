"use client";
import MovieCard from "@/components/movies/MovieCard";
import MoviesGrid from "@/components/movies/MoviesGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useNowPlayingMovies from "@/hooks/movies/useNowPlayingMovies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function NowPlayingMoviesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Now Playing Movies",
    "es-AR": "Películas en Cartelera",
    "fr-FR": "Films à l'affiche",
  };
  const { movies, actualPage, totalPages, isLoading, isError } =
    useNowPlayingMovies({ page, language });

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
            baseUrl="/movies/now-playing?"
          >
            <MoviesGrid movies={movies} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function NowPlayingMoviesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <NowPlayingMoviesPage />
    </Suspense>
  );
}
