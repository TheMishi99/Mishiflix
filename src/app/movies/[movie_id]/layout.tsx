"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import useMovie from "@/hooks/movies/useMovie";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function MovieDetailsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { language } = useLanguage();
  const { movie_id } = useParams();
  const { movie } = useMovie({ movie_id: Number(movie_id), language });
  return (
    <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
      {movie && (
        <Link href={`/movies/${movie_id}`} className="text-2xl">
          {movie.title}
        </Link>
      )}
      {children}
    </div>
  );
}
