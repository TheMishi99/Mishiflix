"use client";
import SeriesHorizontalSlideableList from "@/components/series/SeriesHorizontalSlideableList";
import { useLanguage } from "@/contexts/LanguageContext";
import useAiringTodaySeries from "@/hooks/series/useAiringTodaySeries";
import useOnTheAirSeries from "@/hooks/series/useOnTheAirSeries";
import usePopularSeries from "@/hooks/series/usePopularSeries";
import useTopRatedSeries from "@/hooks/series/useTopRatedSeries";
import Link from "next/link";

export default function SeriesPage() {
  // Obtenemos el lenguaje actual
  const { language } = useLanguage();

  // Obtenemos las peliculas que se estan reproduciendo actualmente, las populares y las proximas a estrenarse
  const { series: popularSeries } = usePopularSeries({
    page: 1,
    language,
  });
  const { series: onTheAirSeries } = useOnTheAirSeries({ page: 1, language });
  const { series: airingTodaySeries } = useAiringTodaySeries({
    page: 1,
    language,
  });
  const { series: topRatedSeries } = useTopRatedSeries({ page: 1, language });

  // Definimos las secciones de la pagina principal por idioma
  const sectionsByLanguage = {
    "en-US": [
      {
        title: "Airing Today",
        series: airingTodaySeries,
        url: "/series/airing-today",
      },
      {
        title: "On The Air",
        series: onTheAirSeries,
        url: "/series/on-the-air",
      },
      { title: "Popular", series: popularSeries, url: "/series/popular" },
      {
        title: "Top Rated",
        series: topRatedSeries,
        url: "/series/top-rated",
      },
    ],
    "es-AR": [
      {
        title: "Emitiendo Hoy",
        series: airingTodaySeries,
        url: "/series/airing-today",
      },
      {
        title: "En Emisión",
        series: onTheAirSeries,
        url: "/series/on-the-air",
      },
      { title: "Popular", series: popularSeries, url: "/series/popular" },
      {
        title: "Mejor Valoradas",
        series: topRatedSeries,
        url: "/series/top-rated",
      },
    ],
    "fr-FR": [
      {
        title: "Diffusé Aujourd'hui",
        series: airingTodaySeries,
        url: "/series/airing-today",
      },
      {
        title: "En Cours de Diffusion",
        series: onTheAirSeries,
        url: "/series/on-the-air",
      },
      { title: "Populaires", series: popularSeries, url: "/series/popular" },
      {
        title: "Les Mieux Notées",
        series: topRatedSeries,
        url: "/series/top-rated",
      },
    ],
  };

  // Definimos el texto para ver mas por idioma
  const seeMoreTextByLanguage = {
    "en-US": "See all",
    "es-AR": "Ver todo",
    "fr-FR": "Voir tout",
  };

  // Mostramos las secciones de la pagina principal
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2">
      {sectionsByLanguage[language as keyof typeof sectionsByLanguage].map(
        (section, index) => (
          <section
            key={index + section.title}
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
            <SeriesHorizontalSlideableList series={section.series} />
          </section>
        )
      )}
    </div>
  );
}
