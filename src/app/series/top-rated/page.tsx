"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useTopRatedSeries from "@/hooks/series/useTopRatedSeries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const titlesByLanguage = {
  "en-US": "Top Rated",
  "es-AR": "Mejor Valoradas",
  "fr-FR": "Les Mieux Notées",
};

export default function TopRatedSeriesPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const { series, actualPage, totalPages, isLoading, isError } =
    useTopRatedSeries({ page, language });

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
        baseUrl="/series/top-rated?"
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
