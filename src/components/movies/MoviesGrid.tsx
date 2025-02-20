import { Movie } from "@/types/movie-types";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies }: { movies: Movie[] }) {
  return (
    <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
      {movies.map((movie) => (
        <li
          key={movie.id + movie.title}
          className="group overflow-hidden rounded-xl group bg-gray-800 relative"
        >
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
