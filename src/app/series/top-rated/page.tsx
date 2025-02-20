"use client";
import PageButtons from "@/components/PageButtons";
import SeriesCard from "@/components/series/SerieCard";
import SeriesGrid from "@/components/series/SeriesGrid";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useTopRatedSeries from "@/hooks/series/useTopRatedSeries";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function TopRatedSeriesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Top Rated",
    "es-AR": "Mejor Valoradas",
    "fr-FR": "Les Mieux Notées",
  };

  const { series, actualPage, totalPages, isLoading, isError } =
    useTopRatedSeries({ page, language });

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
            baseUrl="/series/top-rated?"
          >
            <SeriesGrid series={series} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function TopRatedSeriesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <TopRatedSeriesPage />
    </Suspense>
  );
}
