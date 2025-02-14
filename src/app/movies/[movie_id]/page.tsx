"use client";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import useMovie from "@/hooks/movies/useMovie";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MovieDetailsPage() {
  const { userLogged, addFavoriteMovie } = useUserLogged();
  const { movie_id } = useParams();
  const { language } = useLanguage();
  const { movie, isLoading, isError } = useMovie({
    movie_id: Number(movie_id),
    language,
  });

  const titleByLanguage = {
    "en-US": {
      mainTitle: "Movie Details",
      addFavorites: "Add to favorites",
      budget: { title: "Budget", currency: "USD" },
      overview: "Overview",
      genres: "Genres",
      popularity: "Popularity",
      release_date: "Release Date",
      homepage: "Homepage",
    },
    "es-AR": {
      mainTitle: "Detalles de la Película",
      addFavorites: "Añadir a favoritos",
      budget: { title: "Presupuesto", currency: "ARS" },
      overview: "Resumen",
      genres: "Géneros",
      popularity: "Popularidad",
      release_date: "Fecha de lanzamiento",
      homepage: "Pagina principal",
    },
    "fr-FR": {
      mainTitle: "Détails du Film",
      addFavorites: "Ajouter aux favoris",
      budget: { title: "Budget", currency: "EUR" },
      overview: "Aperçu",
      genres: "Genres",
      popularity: "Popularité",
      release_date: "Date de sortie",
      homepage: "Page d'accueil",
    },
  };

  const handleAddToFavoriteButtonClick = async ({
    movie_id,
  }: {
    movie_id: number;
  }) => {
    const addToFavoriteSuccess = await addFavoriteMovie({ movie_id });
  };

  return (
    <div
      id="movie-details"
      className="h-dvh flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll"
    >
      <h2 className="text-2xl">
        {titleByLanguage[language as keyof typeof titleByLanguage].mainTitle}
      </h2>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        movie && (
          <div
            id="movie-info"
            className="flex flex-col sm:flex-row justify-center items-center sm:items-start p-2 gap-2"
          >
            <div
              id="movie-info-1"
              className="flex flex-col justify-center items-center p-2 gap-2"
            >
              <img
                src={
                  "https://media.themoviedb.org/t/p/w220_and_h330_face" +
                  movie.poster_path
                }
                alt={movie.title}
              />
              <h3 className="text-xl">{movie.title}</h3>
              <button
                className="flex justify-center items-center p-2 gap-2"
                onClick={() =>
                  handleAddToFavoriteButtonClick({ movie_id: movie.id })
                }
              >
                <div className="size-14 rounded-full flex justify-center items-center p-2 gap-2 bg-zinc-800">
                  {userLogged?.favoriteMovies.includes(movie.id) ? (
                    <span className="text-red-600 text-4xl">❤</span>
                  ) : (
                    <span className="text-white text-4xl">❤</span>
                  )}
                </div>
                <span className="">
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .addFavorites
                  }
                </span>
              </button>
            </div>
            <div
              id="movie-info-2"
              className="sm:w-2/3 flex flex-col justify-center items-start p-2 gap-2"
            >
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .overview
                  }
                </strong>
                : {movie.overview}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .genres
                  }
                </strong>
                : {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .budget.title
                  }
                </strong>
                :{" "}
                {movie.budget.toLocaleString(language, {
                  currency:
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .budget.currency,
                  style: "currency",
                })}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .popularity
                  }
                </strong>
                : {movie.popularity}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .release_date
                  }
                </strong>
                : {movie.release_date}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .homepage
                  }
                </strong>
                :{" "}
                <Link href={movie.homepage} className="text-red-600">
                  {movie.homepage}
                </Link>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
