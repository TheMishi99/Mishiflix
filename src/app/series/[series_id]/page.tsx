"use client";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSeries from "@/hooks/series/useSeries";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";

export default function SerieDetailsPage() {
  const { userLogged, addFavoriteSeries: addFavoriteSerie } = useUserLogged();
  const { series_id } = useParams();
  const { language } = useLanguage();
  const {
    serie: series,
    isLoading: serieLoading,
    isError: serieError,
  } = useSeries({
    series_id: Number(series_id),
    language,
  });

  const titleByLanguage = {
    "en-US": {
      mainTitle: "Movie Details",
      addFavorites: "Add to favorites",
      overview: "Overview",
      genres: "Genres",
      popularity: "Popularity",
      created_by: "Created By",
      number_of_episodes: "Number of Episodes",
      number_of_seasons: "Number of Seasons",
      homepage: "Homepage",
    },
    "es-AR": {
      mainTitle: "Detalles de la Película",
      addFavorites: "Añadir a favoritos",
      overview: "Resumen",
      genres: "Géneros",
      popularity: "Popularidad",
      created_by: "Creado Por",
      number_of_episodes: "Numero de Episodios",
      number_of_seasons: "Numero de Temporadas",
      homepage: "Pagina principal",
    },
    "fr-FR": {
      mainTitle: "Détails du Film",
      addFavorites: "Ajouter aux favoris",
      overview: "Aperçu",
      genres: "Genres",
      popularity: "Popularité",
      created_by: "Created By",
      number_of_episodes: "Number of Episodes",
      number_of_seasons: "Number of Seasons",
      homepage: "Page d'accueil",
    },
  };

  const handleAddToFavoriteButtonClick = async ({
    series_id,
    series_title,
  }: {
    series_id: number;
    series_title: string;
  }) => {
    const addFavoriteSerieSuccess = await addFavoriteSerie({
      series_id,
      series_title,
    });
    alert(
      addFavoriteSerieSuccess
        ? "Pelicula añadida a favoritos con exito"
        : "Error al añadir la pelicula a favoritos"
    );
  };

  return (
    <div
      id="serie-details"
      className="h-dvh flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll"
    >
      <h2 className="text-2xl">
        {titleByLanguage[language as keyof typeof titleByLanguage].mainTitle}
      </h2>
      {serieLoading ? (
        <Spinner />
      ) : serieError ? (
        <p>{serieError}</p>
      ) : (
        series && (
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start p-2 gap-2">
            <div className="flex flex-col justify-center items-center p-2 gap-2">
              <img
                src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + series.poster_path}
                alt={series.name}
              />
              <h3 className="text-xl">{series.name}</h3>
              <button
                className="flex justify-center items-center p-2 gap-2"
                onClick={() =>
                  handleAddToFavoriteButtonClick({
                    series_id: series.id,
                    series_title: series.name,
                  })
                }
              >
                <div className="size-14 rounded-full flex justify-center items-center p-2 gap-2 bg-zinc-800">
                  {userLogged?.favoriteMovies
                    .map((favMov) => favMov.id)
                    .includes(series.id) ? (
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
            <div className="sm:w-2/3 flex flex-col justify-center items-start p-2 gap-2">
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .overview
                  }
                </strong>
                : {series.overview}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .genres
                  }
                </strong>
                : {series.genres.map((genre) => genre.name).join(", ")}
              </p>
              {/* <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .budget.title
                  }
                </strong>
                :{" "}
                {serie.budget.toLocaleString(language, {
                  currency:
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .budget.currency,
                  style: "currency",
                })}
              </p> */}
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .popularity
                  }
                </strong>
                : {series.popularity}
              </p>
              {/* <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .release_date
                  }
                </strong>
                : {serie.release_date}
              </p> */}
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .created_by
                  }
                </strong>
                : {series.created_by.map((author) => author.name).join(", ")}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .number_of_episodes
                  }
                </strong>
                : {series.number_of_episodes}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .number_of_seasons
                  }
                </strong>
                : {series.number_of_seasons}
              </p>
              <p>
                <strong>
                  {
                    titleByLanguage[language as keyof typeof titleByLanguage]
                      .homepage
                  }
                </strong>
                :{" "}
                <Link href={series.homepage} className="text-red-600">
                  {series.homepage}
                </Link>
              </p>
              <Link
                href={`/series/${series.id}/seasons`}
                className="bg-red-600 p-2 rounded-xl"
              >
                See Seasons
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}
