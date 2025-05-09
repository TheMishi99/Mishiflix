import { useLanguage } from "@/contexts/LanguageContext";
import useMovieGenres from "@/hooks/genres/useMovieGenres";
import { Dispatch, SetStateAction } from "react";
import { SelectOption } from "@/types/other-types";
import MediaFilters from "../MediaFilters";
import Spinner from "@/components/Spinner";

const genresTitleByLanguage = {
  "en-US": { genres: "Genres", notFound: "Genres not Found" },
  "es-AR": { genres: "Géneros", notFound: "No se encontraron géneros" },
  "fr-FR": { genres: "Genres", notFound: "Genres non trouvés" },
};

const sortBySelectTitlesByLanguage = {
  "en-US": {
    sortBy: "Sort By",
    options: {
      title: "Title",
      originalTitle: "Original Title",
      popularity: "Popularity",
      releaseDate: "Release Date",
      voteAverage: "Vote Average",
      voteCount: "Vote Count",
      revenue: "Revenue",
    },
  },
  "es-AR": {
    sortBy: "Ordenar Por",
    options: {
      title: "Título",
      originalTitle: "Título Original",
      popularity: "Popularidad",
      releaseDate: "Fecha de Estreno",
      voteAverage: "Promedio de Votos",
      voteCount: "Cantidad de Votos",
      revenue: "Recaudación",
    },
  },
  "fr-FR": {
    sortBy: "Trier Par",
    options: {
      title: "Titre",
      originalTitle: "Titre Original",
      popularity: "Popularité",
      releaseDate: "Date de Sortie",
      voteAverage: "Moyenne des Votes",
      voteCount: "Nombre de Votes",
      revenue: "Revenu",
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

export default function MovieFilters({
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
  const { genres, isLoading, isError } = useMovieGenres({ language });

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
      value: "title",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.title,
    },
    {
      id: 2,
      value: "original_title",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.originalTitle,
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
      value: "primary_release_date",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.releaseDate,
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
    {
      id: 7,
      value: "revenue",
      label:
        sortBySelectTitlesByLanguage[
          language as keyof typeof sortBySelectTitlesByLanguage
        ].options.revenue,
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
