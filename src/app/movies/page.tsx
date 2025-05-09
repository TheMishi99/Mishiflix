"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import useNowPlayingMovies from "@/hooks/movies/useNowPlayingMovies";
import usePopularMovies from "@/hooks/movies/usePopularMovies";
import useUpcomingMovies from "@/hooks/movies/useUpcomingMovies";
import Link from "next/link";
import useTopRatedMovies from "@/hooks/movies/useTopRatedMovies";
import MediasSlideableList from "@/components/medias/MediasSlideableList";
import { useMemo } from "react";

// Definimos el texto para ver mas por idioma
const seeMoreTextByLanguage = {
  "en-US": "See all",
  "es-AR": "Ver todo",
  "fr-FR": "Voir tout",
};

const titlesByLanguage = {
  "en-US": {
    nowPlaying: "Now Playing",
    upcoming: "Upcoming",
    popular: "Popular",
    topRated: "Top Rated",
  },
  "es-AR": {
    nowPlaying: "En Cartelera",
    upcoming: "Proximamente",
    popular: "Populares",
    topRated: "Mejor Valoradas",
  },
  "fr-FR": {
    nowPlaying: "En Cours",
    upcoming: "A Venir",
    popular: "Populaires",
    topRated: "Les Mieux Notées",
  },
};
export default function MoviesPage() {
  // Obtenemos el lenguaje actual
  const { language } = useLanguage();

  // Obtenemos las peliculas que se estan reproduciendo actualmente, las populares y las proximas a estrenarse
  const { movies: nowPlayingMovies, isError: isNowPlayingMoviesError } =
    useNowPlayingMovies({
      page: 1,
      language,
    });
  const { movies: popularMovies, isError: isPopularMoviesError } =
    usePopularMovies({ page: 1, language });
  const { movies: upcomingMovies, isError: isUpcomingMoviesError } =
    useUpcomingMovies({ page: 1, language });
  const { movies: topRatedMovies, isError: isTopRatedMoviesError } =
    useTopRatedMovies({ page: 1, language });

  // Definimos las secciones de la pagina principal por idioma
  const sections = useMemo(
    () => [
      {
        id: 1,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage]
            .nowPlaying,
        movies: nowPlayingMovies,
        url: "/movies/now-playing",
      },
      {
        id: 2,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].upcoming,
        movies: upcomingMovies,
        url: "/movies/upcoming",
      },
      {
        id: 3,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].popular,
        movies: popularMovies,
        url: "/movies/popular",
      },
      {
        id: 4,
        title:
          titlesByLanguage[language as keyof typeof titlesByLanguage].topRated,
        movies: topRatedMovies,
        url: "/movies/top-rated",
      },
    ],
    [language, popularMovies, upcomingMovies, nowPlayingMovies, topRatedMovies]
  );

  if (isPopularMoviesError) return <p>{isPopularMoviesError}</p>;
  if (isNowPlayingMoviesError) return <p>{isNowPlayingMoviesError}</p>;
  if (isUpcomingMoviesError) return <p>{isUpcomingMoviesError}</p>;
  if (isTopRatedMoviesError) return <p>{isTopRatedMoviesError}</p>;
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
            medias={section.movies.map((m) => {
              return {
                id: m.id,
                image: m.poster_path,
                url: `/movies/${m.id}`,
                title: m.title,
                overview: m.overview,
              };
            })}
          />
        </section>
      ))}
    </div>
  );
}
