"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useUpcomingMovies from "@/hooks/movies/useUpcomingMovies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function UpcomingMoviesPage() {
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
            baseUrl="/movies/upcoming?"
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

export default function UpcomingMoviesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <UpcomingMoviesPage />
    </Suspense>
  );
}
