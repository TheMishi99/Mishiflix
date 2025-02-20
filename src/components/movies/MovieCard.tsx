import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import { Movie } from "@/types/movie-types";
import { delimitString } from "@/utils/functions";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <>
      <img
        src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + movie.poster_path}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <Link
        href={`/movies/${movie.id}`}
        className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-start text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
        <p className="text-sm mb-4">
          {delimitString({ phrase: movie.overview, max: 100 })}
        </p>
      </Link>
    </>
  );
}
