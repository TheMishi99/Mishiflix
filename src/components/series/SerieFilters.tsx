import { useLanguage } from "@/contexts/LanguageContext";
import useMovieGenres from "@/hooks/genres/useMovieGenres";
import Spinner from "../Spinner";

export default function SerieFilters({
  selectedGenres,
  setSelectedGenres,
  order_by,
  setOrder_by,
  order,
  setOrder,
}: {
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  order_by: string;
  setOrder_by: React.Dispatch<React.SetStateAction<string>>;
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
  } = useMovieGenres({ language });
  return (
    <div
      id="filters"
      className="flex flex-wrap justify-center items-center p-2 gap-2"
    >
      <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
        <p>Genres:</p>
        {genresLoading ? (
          <Spinner />
        ) : genresError ? (
          <p>{genresError}</p>
        ) : genres.length === 0 ? (
          <p>No genres found</p>
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
        <p>Order By:</p>
        <select
          name="order_by"
          onChange={(event) => setOrder_by(event.target.value)}
          className="p-2 bg-zinc-900"
          defaultValue={order_by}
        >
          <option value="title">Title</option>
          <option value="original_title">Original Title</option>
          <option value="popularity">Popularity</option>
          <option value="primary_release_date">Release Date</option>
          <option value="vote_average">Vote Average</option>
          <option value="vote_count">Vote Count</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>
      <div className="flex justify-center items-center p-2 gap-2">
        <p>Order:</p>
        <select
          name="order"
          onChange={(event) => setOrder(event.target.value)}
          className="p-2 bg-zinc-900"
          defaultValue={order}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
}
