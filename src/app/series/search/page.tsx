"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import useSearchSeries from "@/hooks/series/useSearchSeries";
import SeriesGrid from "@/components/series/SeriesGrid";

function SearchSeriesPage() {
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
    series,
    totalResults,
    isLoading: seriesLoading,
    isError: seriesError,
  } = useSearchSeries({
    term: term || "",
    page: page ? parseInt(page) : 1,
    language,
  });

  const titlesByLanguage = {
    "en-US": {
      title: `Search Results: ${term}`,
      notFound: "No series found",
      results: `Total results: ${totalResults} (showing ${series.length})`,
    },
    "es-AR": {
      title: `Resultados de la búsqueda: ${term}`,
      notFound: "No se encontraron series",
      results: `Resultados totales: ${totalResults} (se muestran ${series.length})`,
    },
    "fr-FR": {
      title: `Résultats de la recherche: ${term}`,
      notFound: "Aucune série trouvée",
      results: `Résultats totaux: ${totalResults} (montrant ${series.length})`,
    },
  };

  return (
    <div className="flex flex-col justify-start items-center p-2 overflow-y-scroll">
      <h2 className="text-2xl">
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
            baseUrl={`/series/search?term=${term}&`}
          >
            <SeriesGrid series={series} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function SearchSeriesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchSeriesPage />
    </Suspense>
  );
}
