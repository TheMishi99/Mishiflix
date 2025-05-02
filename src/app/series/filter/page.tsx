"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import useFilteredSeries from "@/hooks/series/useFilteredSeries";
import MediasGrid from "@/components/medias/MediasGrid";
import SeriesFilters from "@/components/medias/series/SeriesFilters";

const titlesByLanguage = {
  "en-US": {
    title: `Search Results: `,
    notFound: "No movies found",
    results: "Total results",
    showing: "showing",
  },
  "es-AR": {
    title: `Resultados de la búsqueda: `,
    notFound: "No se encontraron peliculas",
    results: "Resultados totales",
    showing: "se muestran",
  },
  "fr-FR": {
    title: `Résultats de la recherche:`,
    notFound: "Aucun film trouvé",
    results: "Résultats totaux",
    showing: "montrant",
  },
};

export default function FilteredSeriesPage() {
  const [page, setPage] = useState<number>(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [order, setOrder] = useState<string>("desc");

  const searchParams = useSearchParams();

  const { language } = useLanguage();

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setSortBy(searchParams.get("order_by") || "popularity");
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
    sortBy,
    order,
  });

  if (seriesLoading) return <Spinner />;

  if (seriesError) return <p>{seriesError}</p>;

  return (
    <div className="flex flex-col justify-start items-center p-2 ">
      <SeriesFilters
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />
      <h2>
        {titlesByLanguage[language as keyof typeof titlesByLanguage].title}
      </h2>
      {series.length === 0 ? (
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
            : {totalResults} (
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .showing
            }{" "}
            {series.length})
          </p>
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl={`/series/filter?${
              selectedGenres.length >= 1
                ? `genres=${selectedGenres.join(",")}&`
                : ""
            }order_by=${sortBy}&order=${order}&`}
          >
            <MediasGrid
              medias={series.map((s) => {
                return {
                  id: s.id,
                  image: s.poster_path,
                  url: `/series/${s.id}`,
                  title: s.name,
                  overview: s.overview,
                };
              })}
            />
          </PageButtons>
        </>
      )}
    </div>
  );
}
