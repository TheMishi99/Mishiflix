import { useLanguage } from "@/contexts/LanguageContext";
import Spinner from "../Spinner";
import useSeriesGenres from "@/hooks/genres/useSeriesGenres";

export default function SeriesFilters({
  selectedGenres,
  setSelectedGenres,
  orderBy,
  setOrderBy,
  order,
  setOrder,
}: {
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleGenreInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const genreId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, genreId]);
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    }
  };
  const { language } = useLanguage();
  const {
    genres,
    isLoading: genresLoading,
    isError: genresError,
  } = useSeriesGenres({ language });

  const genresTitleByLanguage = {
    "en-US": { genres: "Genres", notFound: "Genres not Found" },
    "es-AR": { genres: "Géneros", notFound: "No se encontraron géneros" },
    "fr-FR": { genres: "Genres", notFound: "Genres non trouvés" },
  };

  const orderBySelectByLanguage = {
    "en-US": {
      orderBy: "Order By",
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
      orderBy: "Ordenar Por",
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
      orderBy: "Trier Par",
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

  const orderSelectByLanguage = {
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

  return (
    <div
      id="filters"
      className="flex flex-wrap justify-center items-center p-2 gap-2"
    >
      <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
        <p>
          <strong>
            {
              genresTitleByLanguage[
                language as keyof typeof genresTitleByLanguage
              ].genres
            }
          </strong>
          :
        </p>
        {genresLoading ? (
          <Spinner />
        ) : genresError ? (
          <p>{genresError}</p>
        ) : genres.length === 0 ? (
          <p>
            {
              genresTitleByLanguage[
                language as keyof typeof genresTitleByLanguage
              ].notFound
            }
          </p>
        ) : (
          <ul className="flex flex-wrap justify-center items-center p-2 gap-2">
            {genres.map((genre) => (
              <li key={genre.id}>
                <label className="flex items-center gap-2 p-2 bg-red-600 rounded-xl">
                  <input
                    type="checkbox"
                    name="genres"
                    value={genre.id}
                    onChange={handleGenreInputOnChange}
                    checked={selectedGenres.includes(genre.id)}
                  />
                  <span>{genre.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center items-center p-2 gap-2">
        <p>
          <strong>
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].orderBy
            }
          </strong>
          :
        </p>
        <select
          name="order_by"
          onChange={(event) => setOrderBy(event.target.value)}
          className="p-2 bg-zinc-900"
          defaultValue={orderBy}
        >
          <option value="name">
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].options.name
            }
          </option>
          <option value="original_name">
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].options.originalName
            }
          </option>
          <option value="popularity">
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].options.popularity
            }
          </option>
          <option value="first_air_date">
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].options.firstAirDate
            }
          </option>
          <option value="vote_average">
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].options.voteAverage
            }
          </option>
          <option value="vote_count">
            {
              orderBySelectByLanguage[
                language as keyof typeof orderBySelectByLanguage
              ].options.voteCount
            }
          </option>
        </select>
      </div>
      <div className="flex justify-center items-center p-2 gap-2">
        <p>
          <strong>
            {
              orderSelectByLanguage[
                language as keyof typeof orderSelectByLanguage
              ].order
            }
          </strong>
          :
        </p>
        <select
          name="order"
          onChange={(event) => setOrder(event.target.value)}
          className="p-2 bg-zinc-900"
          defaultValue={order}
        >
          <option value="asc">
            {
              orderSelectByLanguage[
                language as keyof typeof orderSelectByLanguage
              ].options.asc
            }
          </option>
          <option value="desc">
            {
              orderSelectByLanguage[
                language as keyof typeof orderSelectByLanguage
              ].options.desc
            }
          </option>
        </select>
      </div>
    </div>
  );
}
