"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import MovieFilters from "@/components/movies/MovieFilters";
import useFilteredSeries from "@/hooks/series/useFilteredSeries";
import SeriesGrid from "@/components/series/SeriesGrid";

function FilteredSeriesPage() {
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
    series,
    totalResults,
    isLoading: seriesLoading,
    isError: seriesError,
  } = useFilteredSeries({
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
      results: `Total results: ${totalResults} (showing ${series.length})`,
    },
    "es-AR": {
      title: `Resultados de la búsqueda: `,
      notFound: "No se encontraron peliculas",
      results: `Resultados totales: ${totalResults} (se muestran ${series.length})`,
    },
    "fr-FR": {
      title: `Résultats de la recherche:`,
      notFound: "Aucun film trouvé",
      results: `Résultats totaux: ${totalResults} (montrant ${series.length})`,
    },
  };

  return (
    <div className="flex flex-col justify-start items-center p-2 overflow-y-scroll">
      <h2>
        {titlesByLanguage[language as keyof typeof titlesByLanguage].title}
      </h2>
      {seriesLoading ? (
        <Spinner />
      ) : seriesError ? (
        <p>{seriesError}</p>
      ) : series.length === 0 ? (
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
            baseUrl={`/series/filter?${
              selectedGenres.length >= 1
                ? `genres=${selectedGenres.join(",")}&`
                : ""
            }order_by=${order_by}&order=${order}&`}
          >
            <SeriesGrid series={series} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function FilteredSeriesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <FilteredSeriesPage />
    </Suspense>
  );
}
