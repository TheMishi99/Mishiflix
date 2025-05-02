"use client";
import MediasSlideableList from "@/components/medias/MediasSlideableList";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useAiringTodaySeries from "@/hooks/series/useAiringTodaySeries";
import useOnTheAirSeries from "@/hooks/series/useOnTheAirSeries";
import usePopularSeries from "@/hooks/series/usePopularSeries";
import useTopRatedSeries from "@/hooks/series/useTopRatedSeries";
import Link from "next/link";
import { useMemo } from "react";

// Definimos el texto para ver mas por idioma
const seeMoreTextByLanguage = {
  "en-US": "See all",
  "es-AR": "Ver todo",
  "fr-FR": "Voir tout",
};

const titlesByLanguage = {
  "en-US": {
    airingToday: "Airing Today",
    onTheAir: "On The Air",
    popular: "Popular",
    topRated: "Top Rated",
  },
  "es-AR": {
    airingToday: "En Emisión",
    onTheAir: "En Emisión",
    popular: "Populares",
    topRated: "Mejor Valoradas",
  },
  "fr-FR": {
    airingToday: "En Cours de Diffusion",
    onTheAir: "En Cours de Diffusion",
    popular: "Populaires",
    topRated: "Les Mieux Notées",
  },
};

export default function SeriesPage() {
  // Obtenemos el lenguaje actual
  const { language } = useLanguage();

  // Obtenemos las peliculas que se estan reproduciendo actualmente, las populares y las proximas a estrenarse
  const {
    series: popularSeries,
    isLoading: isPopularSeriesLoading,
    isError: isPopularSeriesError,
  } = usePopularSeries({
    page: 1,
    language,
  });
  const {
    series: onTheAirSeries,
    isLoading: isOnTheAirSeriesLoading,
    isError: isOnTheAirSeriesError,
  } = useOnTheAirSeries({ page: 1, language });
  const {
    series: airingTodaySeries,
    isLoading: isAiringTodaySeriesLoading,
    isError: isAiringTodaySeriesError,
  } = useAiringTodaySeries({
    page: 1,
    language,
  });
  const {
    series: topRatedSeries,
    isLoading: isTopRatedSeriesLoading,
    isError: isTopRatedSeriesError,
  } = useTopRatedSeries({ page: 1, language });

  // Definimos las secciones de la pagina principal por idioma
  const sections = useMemo(
    () => [
      {
        id: 1,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage]
            .airingToday,
        series: airingTodaySeries,
        url: "/series/airing-today",
      },
      {
        id: 2,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].onTheAir,
        series: onTheAirSeries,
        url: "/series/on-the-air",
      },
      {
        id: 3,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].popular,
        series: popularSeries,
        url: "/series/popular",
      },
      {
        id: 4,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].topRated,
        series: topRatedSeries,
        url: "/series/top-rated",
      },
    ],
    [language, popularSeries, onTheAirSeries, airingTodaySeries, topRatedSeries]
  );

  if (
    isPopularSeriesLoading ||
    isOnTheAirSeriesLoading ||
    isAiringTodaySeriesLoading ||
    isTopRatedSeriesLoading
  )
    return <Spinner />;

  if (isAiringTodaySeriesError) return <p>{isAiringTodaySeriesError}</p>;
  if (isOnTheAirSeriesError) return <p>{isOnTheAirSeriesError}</p>;
  if (isPopularSeriesError) return <p>{isPopularSeriesError}</p>;
  if (isTopRatedSeriesError) return <p>{isTopRatedSeriesError}</p>;

  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2">
      {sections.map((section) => (
        <section
          key={section.id}
          className="flex flex-col justify-center items-start p-2 gap-2 w-full"
        >
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <Link
              href={section.url}
              className="flex justify-center items-center p-2 gap-2 border border-zinc-800 rounded-xl"
            >
              {
                seeMoreTextByLanguage[
                  language as keyof typeof seeMoreTextByLanguage
                ]
              }
            </Link>
          </div>
          <MediasSlideableList
            medias={section.series.map((s) => {
              return {
                id: s.id,
                image: s.poster_path,
                url: `/series/${s.id}`,
                title: s.name,
                overview: s.overview,
              };
            })}
          />
        </section>
      ))}
    </div>
  );
}
