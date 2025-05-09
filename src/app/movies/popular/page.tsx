"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularMovies from "@/hooks/movies/usePopularMovies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const titlesByLanguage = {
  "en-US": "Popular Movies",
  "es-AR": "Películas Populares",
  "fr-FR": "Films Populaires",
};

export default function PopularMoviesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const { movies, actualPage, totalPages, isLoading, isError } =
    usePopularMovies({ page, language });

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
            baseUrl="/movies/popular?"
          >
            <MediasGrid
              medias={movies.map((m) => {
                return {
                  id: m.id,
                  image: m.poster_path,
                  url: `/movies/${m.id}`,
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