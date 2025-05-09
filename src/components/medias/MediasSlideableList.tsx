import MediaCard from "./MediaCard";
import { Media } from "@/types/other-types";

export default function MediasSlideableList({
  medias,
}: Readonly<{ medias: Media[] }>) {
  return (
    <div className="relative w-full">
      <ul className="flex gap-4 p-2 overflow-x-auto w-full max-w-screen scrollbar-hide snap-x snap-mandatory">
        {medias.map((media) => (
          <li key={media.id + media.title} className="snap-start flex-shrink-0">
            <MediaCard media={media} />
          </li>
        ))}
      </ul>
    </div>
  );
}
