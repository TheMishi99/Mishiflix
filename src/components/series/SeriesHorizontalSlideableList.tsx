"use client";
import { Series } from "@/types/series-types";
import SeriesCard from "./SerieCard";
import { useRef } from "react";

export default function SeriesHorizontalSlideableList({
  series,
}: {
  series: Series[];
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
        {series.map((serie) => (
          <li
            key={serie.id + serie.name}
            className="group w-64 h-96 overflow-hidden rounded-lg shadow-lg snap-start flex-shrink-0 aspect-[2/3] bg-gray-800 relative"
          >
            <SeriesCard series={serie} />
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
