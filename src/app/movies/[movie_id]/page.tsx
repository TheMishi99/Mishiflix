"use client";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useMovie from "@/hooks/movies/useMovie";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";

const titleByLanguage = {
  "en-US": {
    mainTitle: "Movie Details",
    budget: { title: "Budget", currency: "USD" },
    overview: "Overview",
    genres: "Genres",
    popularity: "Popularity",
    release_date: "Release Date",
    homepage: "Homepage",
  },
  "es-AR": {
    mainTitle: "Detalles de la Película",
    budget: { title: "Presupuesto", currency: "ARS" },
    overview: "Resumen",
    genres: "Géneros",
    popularity: "Popularidad",
    release_date: "Fecha de lanzamiento",
    homepage: "Pagina principal",
  },
  "fr-FR": {
    mainTitle: "Détails du Film",
    budget: { title: "Budget", currency: "EUR" },
    overview: "Aperçu",
    genres: "Genres",
    popularity: "Popularité",
    release_date: "Date de sortie",
    homepage: "Page d'accueil",
  },
};

export default function MovieDetailsPage() {
  const { movie_id } = useParams();
  const { language } = useLanguage();
  const { movie, isLoading, isError } = useMovie({
    movie_id: Number(movie_id),
    language,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>{isError}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start p-2 gap-2">
      <div className="flex flex-col justify-center items-center p-2 gap-2">
        <img
          src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + movie.poster_path}
          alt={movie.title}
        />
      </div>
      <div className="sm:w-2/3 flex flex-col justify-center items-start p-2 gap-2">
        <p className="w-full">
          <strong>
            {titleByLanguage[language as keyof typeof titleByLanguage].overview}
          </strong>
          : {movie.overview}
        </p>
        <p className="w-full">
          <strong>
            {titleByLanguage[language as keyof typeof titleByLanguage].genres}
          </strong>
          : {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage].budget
                .title
            }
          </strong>
          :{" "}
          {movie.budget.toLocaleString(language, {
            currency:
              titleByLanguage[language as keyof typeof titleByLanguage].budget
                .currency,
            style: "currency",
          })}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage]
                .popularity
            }
          </strong>
          : {movie.popularity}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage]
                .release_date
            }
          </strong>
          : {movie.release_date}
        </p>
        <p className="w-full">
          <strong>
            {titleByLanguage[language as keyof typeof titleByLanguage].homepage}
          </strong>
          :{" "}
          <Link href={movie.homepage} className="text-red-600" target="_blank">
            {movie.homepage}
          </Link>
        </p>
      </div>
    </div>
  );
}
