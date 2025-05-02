import { SelectOption } from "@/types/other-types";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import Select from "../ui/Select";
import { Genre } from "@/types/media-types";

export default function MediaFilters({
  genresSection,
  selectsSection,
}: {
  genresSection: {
    title: string;
    notFound: string;
    genres: Genre[];
    selectedGenres: number[];
    setSelectedGenres: Dispatch<SetStateAction<number[]>>;
  };
  selectsSection: {
    id: number;
    title: string;
    options: SelectOption[];
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }[];
}) {
  const handleGenreInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const genreId = Number(event.target.value);
    if (event.target.checked) {
      genresSection.setSelectedGenres((prevSelectedGenres) => [
        ...prevSelectedGenres,
        genreId,
      ]);
    } else {
      genresSection.setSelectedGenres((prevSelectedGenres) =>
        prevSelectedGenres.filter((id) => id !== genreId)
      );
    }
  };
  return (
    <div
      id="filters"
      className="flex flex-wrap justify-center items-center p-2 gap-2"
    >
      <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
        <p>
          <strong>{genresSection.title}</strong>:
        </p>
        {genresSection.genres.length === 0 ? (
          <p>{genresSection.notFound}</p>
        ) : (
          <ul className="flex flex-wrap justify-center items-center p-2 gap-2">
            {genresSection.genres.map((genre) => (
              <li key={genre.id}>
                <label className="flex items-center gap-2 p-2 bg-red-600 rounded-xl">
                  <input
                    type="checkbox"
                    name="genres"
                    value={genre.id}
                    onChange={handleGenreInputOnChange}
                    checked={genresSection.selectedGenres.includes(genre.id)}
                  />
                  <span>{genre.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectsSection.map((s) => (
        <div key={s.id} className="flex justify-center items-center p-2 gap-2">
          <p>
            <strong>{s.title}</strong>:
          </p>
          <Select options={s.options} value={s.value} setValue={s.setValue} />
        </div>
      ))}
    </div>
  );
}
