import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import MediaCard from "./MediaCard";
import { Media } from "@/types/other-types";

export default function MediasSlideableList({
  medias,
}: Readonly<{ medias: Media[] }>) {
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
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full z-10 hover:bg-zinc-700"
      >
        <ArrowLeft />
      </button>
      <ul
        ref={containerRef}
        className="flex gap-4 p-2 overflow-x-auto w-full max-w-screen scrollbar-hide snap-x snap-mandatory"
      >
        {medias.map((media) => (
          <li key={media.id + media.title} className="snap-start flex-shrink-0">
            <MediaCard media={media} />
          </li>
        ))}
      </ul>
      <button
        aria-label="scroll right"
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
