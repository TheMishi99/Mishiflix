"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import useFilteredMovies from "@/hooks/movies/useFilteredMovies";
import MovieFilters from "@/components/medias/movies/MovieFilters";
import MediasGrid from "@/components/medias/MediasGrid";

const titlesByLanguage = {
  "en-US": {
    title: `Search Results: `,
    notFound: "No movies found",
    results: "Total results: ",
    results2: "showing ",
  },
  "es-AR": {
    title: `Resultados de la búsqueda: `,
    notFound: "No se encontraron peliculas",
    results: "Resultados totales: ",
    results2: "se muestran ",
  },
  "fr-FR": {
    title: `Résultats de la recherche:`,
    notFound: "Aucun film trouvé",
    results: "Résultats totaux: ",
    results2: "montrant ",
  },
};

export default function FilteredMoviesPage() {
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

  const { actualPage, totalPages, movies, totalResults, isLoading, isError } =
    useFilteredMovies({
      page,
      language,
      genres: selectedGenres,
      order_by,
      order,
    });

  return (
    <div className="flex flex-col justify-start items-center p-2">
      <MovieFilters
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        sortBy={order_by}
        setSortBy={setOrder_by}
        order={order}
        setOrder={setOrder}
      />
      <h2>
        {titlesByLanguage[language as keyof typeof titlesByLanguage].title}
      </h2>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>{isError}</p>
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
            {totalResults} (
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .results2
            }
            {movies.length})
          </p>
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl={`/movies/filter?${
              selectedGenres.length >= 1
                ? `genres=${selectedGenres.join(",")}&`
                : ""
            }order_by=${order_by}&order=${order}&`}
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
