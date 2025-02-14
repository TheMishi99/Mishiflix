"use client";
import PageButtons from "@/components/movies/PageButtons";
import Spinner from "@/components/Spinner";
import useMovies from "@/hooks/movies/useMovies";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import MovieCard from "@/components/movies/MovieCard";

export default function SearchPage() {
  const [title, setTitle] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  useEffect(() => {
    setTitle(searchParams.get("title"));
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
    title: title || "",
    page: page ? parseInt(page) : 1,
    language,
  });

  const titlesByLanguage = {
    "en-US": {
      title: `Search Results: ${title}`,
      notFound: "No movies found",
      results: `Total results: ${totalResults} (showing ${movies.length})`,
    },
    "es-AR": {
      title: `Resultados de la búsqueda: ${title}`,
      notFound: "No se encontraron peliculas",
      results: `Resultados totales: ${totalResults} (se muestran ${movies.length})`,
    },
    "fr-FR": {
      title: `Résultats de la recherche: ${title}`,
      notFound: "Aucun film trouvé",
      results: `Résultats totaux: ${totalResults} (montrant ${movies.length})`,
    },
  };

  return (
    <div className="flex flex-col justify-start items-center p-2 overflow-y-scroll">
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
            baseUrl={`/movies/search?title=${title}&`}
          >
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
          </PageButtons>
        </>
      )}
    </div>
  );
}
