"use client";
import PageButtons from "@/components/PageButtons";
import SeriesGrid from "@/components/series/SeriesGrid";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useAiringTodaySeries from "@/hooks/series/useAiringTodaySeries";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AiringTodaySeriesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Airing Today",
    "es-AR": "Emitiendo Hoy",
    "fr-FR": "Diffusé Aujourd'hui",
  };

  const {
    series,
    actualPage,
    totalPages,
    isLoading: seriesLoading,
    isError: seriesError,
  } = useAiringTodaySeries({ page, language });

  useEffect(() => {
    setPage(Number(params.get("page")) || 1);
  }, [params]);

  return (
    <div className="flex flex-col justify-start items-center p-2 overflow-y-scroll">
      {seriesLoading ? (
        <Spinner />
      ) : seriesError ? (
        <p>{seriesError}</p>
      ) : (
        <>
          <h2>{titlesByLanguage[language as keyof typeof titlesByLanguage]}</h2>
          <PageButtons
            actualPage={actualPage}
            totalPages={totalPages}
            baseUrl="/series/airing-today?"
          >
            <SeriesGrid series={series} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function AiringTodaySeriesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AiringTodaySeriesPage />
    </Suspense>
  );
}
