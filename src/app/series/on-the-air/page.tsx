"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useOnTheAirSeries from "@/hooks/series/useOnTheAirSeries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const titlesByLanguage = {
  "en-US": "On The Air",
  "es-AR": "En Emisión",
  "fr-FR": "En Cours de Diffusion",
};
export default function OnTheAirSeriesPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const { series, actualPage, totalPages, isLoading, isError } =
    useOnTheAirSeries({ page, language });

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);
  return (
    <div className="flex flex-col justify-start items-center p-2 ">
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
