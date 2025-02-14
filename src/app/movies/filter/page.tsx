"use client";
import PageButtons from "@/components/movies/PageButtons";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import useMoviesFiltered from "@/hooks/movies/useMoviesFiltered";
import MovieCard from "@/components/movies/MovieCard";
import MovieFilters from "@/components/movies/MovieFilters";

export default function ByGenreMoviesPage() {
  const [page, setPage] = useState<number>(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [order_by, setOrder_by] = useState<string>("popularity");
  const [order, setOrder] = useState<string>("desc");
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setOrder_by(searchParams.get("order_by") || "popularity");
    setOrder(searchParams.get("order") || "desc");
    setSelectedGenres(
      searchParams
        .get("genres")
        ?.split(",")
        .map((a) => Number(a)) || []
    );
  }, [searchParams]);

  const {
    actualPage,
    totalPages,
    movies,
    totalResults,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useMoviesFiltered({
    page,
    language,
    genres: selectedGenres,
    order_by,
    order,
  });

  const titlesByLanguage = {
    "en-US": {
      title: `Search Results: `,
      notFound: "No movies found",
      results: `Total results: ${totalResults} (showing ${movies.length})`,
    },
    "es-AR": {
      title: `Resultados de la búsqueda: `,
      notFound: "No se encontraron peliculas",
      results: `Resultados totales: ${totalResults} (se muestran ${movies.length})`,
    },
    "fr-FR": {
      title: `Résultats de la recherche:`,
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
          <MovieFilters
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            order_by={order_by}
            setOrder_by={setOrder_by}
            order={order}
            setOrder={setOrder}
          />
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl={`/movies/filter?${
              selectedGenres.length >= 1
                ? `genres=${selectedGenres.join(",")}&`
                : ""
            }order_by=${order_by}&order=${order}&`}
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
