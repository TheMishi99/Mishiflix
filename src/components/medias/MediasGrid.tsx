import { Media } from "@/types/other-types";
import MediaCard from "./MediaCard";

export default function MediasGrid({ medias }: { medias: Media[] }) {
  return (
    <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
      {medias.map((media) => (
        <li key={media.id + media.title} className="">
          <MediaCard media={media} />
        </li>
      ))}
    </ul>
  );
}
