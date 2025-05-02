"use client";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSeries from "@/hooks/series/useSeries";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Image from "next/image";

const titleByLanguage = {
  "en-US": {
    overview: "Overview",
    genres: "Genres",
    popularity: "Popularity",
    created_by: "Created By",
    number_of_episodes: "Number of Episodes",
    number_of_seasons: "Number of Seasons",
    homepage: "Homepage",
  },
  "es-AR": {
    overview: "Resumen",
    genres: "Géneros",
    popularity: "Popularidad",
    created_by: "Creado Por",
    number_of_episodes: "Numero de Episodios",
    number_of_seasons: "Numero de Temporadas",
    homepage: "Pagina principal",
  },
  "fr-FR": {
    overview: "Résumé",
    genres: "Genres",
    popularity: "Popularité",
    created_by: "Créé par",
    number_of_episodes: "Nombre d'épisodes",
    number_of_seasons: "Nombre de saisons",
    homepage: "Page d'accueil",
  },
};

export default function SerieDetailsPage() {
  const { series_id } = useParams();
  const { language } = useLanguage();
  const {
    series: series,
    isLoading: serieLoading,
    isError: serieError,
  } = useSeries({
    series_id: Number(series_id),
    language,
  });

  if (serieLoading) return <Spinner />;
  if (serieError) return <p>{serieError}</p>;
  if (!series) return <p>Serie not found</p>;

  return (
    <div className="w-full flex flex-col sm:flex-row justify-center items-center p-2 gap-2">
      <div className="flex flex-col justify-center items-center p-2 gap-2">
        <Image
          src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + series.poster_path}
          alt={series.name}
          width={100000}
          height={100000}
          className="w-48 aspect-[2/3]"
        />
      </div>
      <div className="w-full sm:w-2/3 flex flex-col justify-center items-center p-2 gap-2">
        <p className="w-full">
          <strong>
            {titleByLanguage[language as keyof typeof titleByLanguage].overview}
          </strong>
          : {series.overview}
        </p>
        <p className="w-full">
          <strong>
            {titleByLanguage[language as keyof typeof titleByLanguage].genres}
          </strong>
          : {series.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage]
                .popularity
            }
          </strong>
          : {series.popularity}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage]
                .created_by
            }
          </strong>
          : {series.created_by.map((author) => author.name).join(", ")}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage]
                .number_of_episodes
            }
          </strong>
          : {series.number_of_episodes}
        </p>
        <p className="w-full">
          <strong>
            {
              titleByLanguage[language as keyof typeof titleByLanguage]
                .number_of_seasons
            }
          </strong>
          : {series.number_of_seasons}
        </p>
        <p className="w-full">
          <strong>
            {titleByLanguage[language as keyof typeof titleByLanguage].homepage}
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
  );
}
