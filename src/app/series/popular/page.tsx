"use client";
import PageButtons from "@/components/PageButtons";
import SeriesCard from "@/components/series/SerieCard";
import SeriesGrid from "@/components/series/SeriesGrid";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularSeries from "@/hooks/series/usePopularSeries";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PopularSeriesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Popular",
    "es-AR": "Popular",
    "fr-FR": "Populaires",
  };

  const { series, actualPage, totalPages, isLoading, isError } =
    usePopularSeries({ page, language });

  useEffect(() => {
    setPage(Number(params.get("page")) || 1);
  }, [params]);

  return (
    <div className="flex flex-col justify-start items-center p-2 overflow-y-scroll">
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
            baseUrl="/series/popular?"
          >
            <SeriesGrid series={series} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function PopularSeriesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <PopularSeriesPage />
    </Suspense>
  );
}
