"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useNowPlayingMovies from "@/hooks/movies/useNowPlayingMovies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NowPlayingMoviesPage() {
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
    <div className="flex flex-col justify-start items-center p-2">
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
            <MediasGrid
              medias={movies.map((m) => {
                return {
                  id: m.id,
                  url: `/movies/${m.id}`,
                  image: m.poster_path,
                  title: m.title,
                  overview: m.overview,
                };
              })}
            />
          </PageButtons>
        </>
      )}
    </div>
  );
}
