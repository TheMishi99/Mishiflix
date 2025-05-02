import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import { Media } from "@/types/other-types";
import { delimitString } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";

export default function MediaCard({ media }: { media: Media }) {
  return (
    <div className="group relative flex flex-col justify-center items-center p-2 gap-2 bg-zinc-900 rounded-xl">
      <Image
        src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + media.image}
        alt={media.title}
        width={225}
        height={225}
        className="aspect-[2/3] object-cover"
      />
      <Link
        href={media.url}
        className="absolute inset-0 bg-black rounded-xl bg-opacity-70 flex flex-col items-center justify-start text-white p-4 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
      >
        <h3 className="text-xl font-bold mb-2">{media.title}</h3>
        <p className="text-sm mb-4">
          {delimitString({ phrase: media.overview, max: 100 })}
        </p>
      </Link>
      <p className="flex sm:hidden">{media.title}</p>
    </div>
  );
}
