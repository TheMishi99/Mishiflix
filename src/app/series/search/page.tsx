"use client";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import useSearchSeries from "@/hooks/series/useSearchSeries";
import MediasGrid from "@/components/medias/MediasGrid";

const titlesByLanguage = {
  "en-US": {
    title: "Search Results",
    notFound: "No series found",
    results: "Total results",
    showing: "showing",
  },
  "es-AR": {
    title: "Resultados de la búsqueda",
    notFound: "No se encontraron series",
    results: "Resultados totales",
    showing: "se muestran",
  },
  "fr-FR": {
    title: "`Résultats de la recherche",
    notFound: "Aucune série trouvée",
    results: "Résultats totaux",
    showing: "montrant",
  },
};
export default function SearchSeriesPage() {
  const [term, setTerm] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  useEffect(() => {
    setTerm(searchParams.get("term"));
    setPage(searchParams.get("page"));
  }, [searchParams]);

  const { actualPage, totalPages, series, totalResults, isLoading, isError } =
    useSearchSeries({
      term: term || "",
      page: page ? parseInt(page) : 1,
      language,
    });

  if (isLoading) return <Spinner />;
  if (isError) return <p>{isError}</p>;

  return (
    <div className="flex flex-col justify-start items-center p-2 ">
      <h2 className="text-2xl">
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
            baseUrl={`/series/search?term=${term}&`}
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
