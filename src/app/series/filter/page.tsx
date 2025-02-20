"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import useFilteredSeries from "@/hooks/series/useFilteredSeries";
import SeriesGrid from "@/components/series/SeriesGrid";
import SeriesFilters from "@/components/series/SeriesFilters";

function FilteredSeriesPage() {
  const [page, setPage] = useState<number>(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<string>("popularity");
  const [order, setOrder] = useState<string>("desc");
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setOrderBy(searchParams.get("order_by") || "popularity");
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
    order_by: orderBy,
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
      <SeriesFilters
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        order={order}
        setOrder={setOrder}
      />
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
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl={`/series/filter?${
              selectedGenres.length >= 1
                ? `genres=${selectedGenres.join(",")}&`
                : ""
            }order_by=${orderBy}&order=${order}&`}
          >
            <SeriesGrid seriesList={series} />
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
