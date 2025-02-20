"use client";
import PageButtons from "@/components/PageButtons";
import SeriesGrid from "@/components/series/SeriesGrid";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useOnTheAirSeries from "@/hooks/series/useOnTheAirSeries";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function OnTheAirSeriesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "On The Air",
    "es-AR": "En Emisión",
    "fr-FR": "En Cours de Diffusion",
  };
  const { series, actualPage, totalPages, isLoading, isError } =
    useOnTheAirSeries({ page, language });

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
            baseUrl="/series/on-the-air?"
          >
            <SeriesGrid seriesList={series} />
          </PageButtons>
        </>
      )}
    </div>
  );
}

export default function OnTheAirSeriesMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OnTheAirSeriesPage />
    </Suspense>
  );
}
