"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import useMovies from "@/hooks/movies/useMovies";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import MediasGrid from "@/components/medias/MediasGrid";

function SearchMoviesPage() {
  const [term, setTerm] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  useEffect(() => {
    setTerm(searchParams.get("term"));
    setPage(searchParams.get("page"));
  }, [searchParams]);

  const {
    actualPage,
    totalPages,
    movies,
    totalResults,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useMovies({
    term: term || "",
    page: page ? parseInt(page) : 1,
    language,
  });

  const titlesByLanguage = {
    "en-US": {
      title: `Search Results: ${term}`,
      notFound: "No movies found",
      results: `Total results: ${totalResults} (showing ${movies.length})`,
    },
    "es-AR": {
      title: `Resultados de la búsqueda: ${term}`,
      notFound: "No se encontraron peliculas",
      results: `Resultados totales: ${totalResults} (se muestran ${movies.length})`,
    },
    "fr-FR": {
      title: `Résultats de la recherche: ${term}`,
      notFound: "Aucun film trouvé",
      results: `Résultats totaux: ${totalResults} (montrant ${movies.length})`,
    },
  };

  return (
    <div className="flex flex-col justify-start items-center p-2">
      <h2>
        {titlesByLanguage[language as keyof typeof titlesByLanguage].title}
      </h2>
      {moviesLoading ? (
        <Spinner />
      ) : moviesError ? (
        <p>{moviesError}</p>
      ) : movies.length === 0 ? (
        <p>
          {titlesByLanguage[language as keyof typeof titlesByLanguage].notFound}
        </p>
      ) : (
        <>
          <p>
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .results
            }
          </p>

          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl={`/movies/search?term=${term}&`}
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

export default function SearchMoviesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchMoviesPage />
    </Suspense>
  );
}
