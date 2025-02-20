"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import useNowPlayingMovies from "@/hooks/movies/useNowPlayingMovies";
import usePopularMovies from "@/hooks/movies/usePopularMovies";
import useUpcomingMovies from "@/hooks/movies/useUpcomingMovies";
import Link from "next/link";
import useTopRatedMovies from "@/hooks/movies/useTopRatedMovies";
import MoviesHorizontalSlideableList from "@/components/movies/MoviesHorizontalSlideableList";

export default function MoviesPage() {
  // Obtenemos el lenguaje actual
  const { language } = useLanguage();

  // Obtenemos las peliculas que se estan reproduciendo actualmente, las populares y las proximas a estrenarse
  const { movies: nowPlayingMovies } = useNowPlayingMovies({
    page: 1,
    language,
  });
  const { movies: popularMovies } = usePopularMovies({ page: 1, language });
  const { movies: upcomingMovies } = useUpcomingMovies({ page: 1, language });
  const { movies: topRatedMovies } = useTopRatedMovies({ page: 1, language });

  // Definimos las secciones de la pagina principal por idioma
  const sectionsByLanguage = {
    "en-US": [
      {
        title: "Now Playing",
        movies: nowPlayingMovies,
        url: "/movies/now-playing",
      },
      {
        title: "Upcoming",
        movies: upcomingMovies,
        url: "/movies/upcoming",
      },
      { title: "Popular", movies: popularMovies, url: "/movies/popular" },
      {
        title: "Top Rated",
        movies: topRatedMovies,
        url: "/movies/top-rated",
      },
    ],
    "es-AR": [
      {
        title: "En Cartelera",
        movies: nowPlayingMovies,
        url: "/movies/now-playing",
      },
      {
        title: "Proximos Lanzamientos",
        movies: upcomingMovies,
        url: "/movies/upcoming",
      },
      { title: "Popular", movies: popularMovies, url: "/movies/popular" },
      {
        title: "Mejor Valoradas",
        movies: topRatedMovies,
        url: "/movies/top-rated",
      },
    ],
    "fr-FR": [
      {
        title: "Films du moment",
        movies: nowPlayingMovies,
        url: "/movies/now-playing",
      },
      {
        title: "Films à venir",
        movies: upcomingMovies,
        url: "/movies/upcoming",
      },
      { title: "Populaires", movies: popularMovies, url: "/movies/popular" },
      {
        title: "Les Mieux Notés",
        movies: topRatedMovies,
        url: "/movies/top-rated",
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
            <MoviesHorizontalSlideableList movies={section.movies} />
          </section>
        )
      )}
    </div>
  );
}
