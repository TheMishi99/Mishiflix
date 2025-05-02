"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useAiringTodaySeries from "@/hooks/series/useAiringTodaySeries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const titlesByLanguage = {
  "en-US": "Airing Today",
  "es-AR": "Emitiendo Hoy",
  "fr-FR": "Diffusé Aujourd'hui",
};

export default function AiringTodaySeriesPage() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const { series, actualPage, totalPages, isLoading, isError } =
    useAiringTodaySeries({ page, language });

  useEffect(() => {
    setPage(Number(params.get("page")) || 1);
  }, [params]);

  if (isLoading) return <Spinner />;

  if (isError) return <p>{isError}</p>;

  return (
    <div className="flex flex-col justify-start items-center p-2 ">
      <h2>{titlesByLanguage[language as keyof typeof titlesByLanguage]}</h2>
      <PageButtons
        actualPage={actualPage}
        totalPages={totalPages}
        baseUrl="/series/airing-today?"
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
    </div>
  );
}
