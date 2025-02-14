import { Movie } from "@/types/my-types";
import MovieCard from "./MovieCard";
import { useRef } from "react";

export default function MoviesHorizontalSlideableList({
  movies,
}: {
  movies: Movie[];
}) {
  const containerRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <button
        aria-label="scroll left"
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full z-10 hover:bg-gray-700"
      >
        {"<-"}
      </button>
      <ul
        ref={containerRef}
        className="flex gap-4 p-2 overflow-x-auto w-full max-w-screen scrollbar-hide snap-x snap-mandatory"
      >
        {movies.map((movie) => (
          <li
            key={movie.id + movie.title}
            className="group w-64 h-96 overflow-hidden rounded-lg shadow-lg snap-start flex-shrink-0 aspect-[2/3] bg-gray-800 relative"
          >
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
      <button
        aria-label="scroll right"
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full z-10 hover:bg-gray-700"
      >
        {"->"}
      </button>
    </div>
  );
}
