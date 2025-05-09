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
    </div>
  );
}
