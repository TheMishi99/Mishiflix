import { useLanguage } from "@/contexts/LanguageContext";
import { SelectOption } from "@/types/other-types";
import MediaFilters from "../MediaFilters";
import useSeriesGenres from "@/hooks/genres/useSeriesGenres";
import Spinner from "@/components/Spinner";
import { Dispatch, SetStateAction } from "react";

const genresTitleByLanguage = {
  "en-US": { genres: "Genres", notFound: "Genres not Found" },
  "es-AR": { genres: "Géneros", notFound: "No se encontraron géneros" },
  "fr-FR": { genres: "Genres", notFound: "Genres non trouvés" },
};

const sortBySelectTitlesByLanguage = {
  "en-US": {
    sortBy: "Sort By",
    options: {
      name: "Name",
      originalName: "Original Name",
      popularity: "Popularity",
      firstAirDate: "First Air Date",
      voteAverage: "Vote Average",
      voteCount: "Vote Count",
    },
  },
  "es-AR": {
    sortBy: "Ordenar Por",
    options: {
      name: "Nombre",
      originalName: "Nombre Original",
      popularity: "Popularidad",
      firstAirDate: "Fecha de Estreno",
      voteAverage: "Promedio de Votos",
      voteCount: "Cantidad de Votos",
    },
  },
  "fr-FR": {
    sortBy: "Trier Par",
    options: {
      name: "Nom",
      originalName: "Nom Original",
      popularity: "Popularité",
      firstAirDate: "Date de Première Diffusion",
      voteAverage: "Moyenne des Votes",
      voteCount: "Nombre de Votes",
    },
  },
};

const orderSelectTitlesByLanguage = {
  "en-US": {
    order: "Order",
    options: { asc: "Ascendant", desc: "Descendant" },
  },
  "es-AR": {
    order: "Orden",
    options: { asc: "Ascendente", desc: "Descendente" },
  },
  "fr-FR": {
    order: "Ordre",
    options: { asc: "Ascendant", desc: "Descendant" },
  },
};

export default function SeriesFilters({
  selectedGenres,
  setSelectedGenres,
  sortBy,
  setSortBy,
  order,
  setOrder,
}: {
  selectedGenres: number[];
  setSelectedGenres: Dispatch<SetStateAction<number[]>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}) {
  const { language } = useLanguage();

  const {
    genres,
    isLoading,
    isError,
  } = useSeriesGenres({ language });

  const genresSection = {
    title:
      genresTitleByLanguage[language as keyof typeof genresTitleByLanguage]
        .genres,
    notFound:
      genresTitleByLanguage[language as keyof typeof genresTitleByLanguage]
        .notFound,
    genres,
    selectedGenres,
    setSelectedGenres,
  };

  const sortBySelectOptions: SelectOption[] = [
    {
      id: 1,
      value: "name",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.name,
    },
    {
      id: 2,
      value: "original_name",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.originalName,
    },
    {
      id: 3,
      value: "popularity",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.popularity,
    },
    {
      id: 4,
      value: "first_air_date",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.firstAirDate,
    },
    {
      id: 5,
      value: "vote_average",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.voteAverage,
    },
    {
      id: 6,
      value: "vote_count",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.voteCount,
    },
  ];

  const orderSelectOptions: SelectOption[] = [
    {
      id: 1,
      value: "asc",
      label:
        orderSelectTitlesByLanguage[
          language as keyof typeof orderSelectTitlesByLanguage
        ].options.asc,
    },
    {
      id: 2,
      value: "desc",
      label:
        orderSelectTitlesByLanguage[
          language as keyof typeof orderSelectTitlesByLanguage
        ].options.desc,
    },
  ];

  const selectsSection = [
    {
      id: 1,
      title:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].sortBy,
      options: sortBySelectOptions,
      value: sortBy,
      setValue: setSortBy,
    },
    {
      id: 2,
      title:
        orderSelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].order,
      options: orderSelectOptions,
      value: order,
      setValue: setOrder,
    },
  ];

  if (isLoading) return <Spinner />;

  if (isError) return <p>{isError}</p>;

  return (
    <MediaFilters
      genresSection={genresSection}
      selectsSection={selectsSection}
    />
  );
}
