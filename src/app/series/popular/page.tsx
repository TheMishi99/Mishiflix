"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularSeries from "@/hooks/series/usePopularSeries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PopularSeriesPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const titlesByLanguage = {
    "en-US": "Popular",
    "es-AR": "Popular",
    "fr-FR": "Populaires",
  };

  const { series, actualPage, totalPages, isLoading, isError } =
    usePopularSeries({ page, language });

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  if (isLoading) return <Spinner />;

  if (isError) return <p>{isError}</p>;

  return (
    <div className="flex flex-col justify-start items-center p-2 ">
      <h2>{titlesByLanguage[language as keyof typeof titlesByLanguage]}</h2>
      <PageButtons
        actualPage={actualPage}
        totalPages={totalPages}
        baseUrl="/series/popular?"
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
