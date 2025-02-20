import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import { Person } from "@/types/people-types";
import Link from "next/link";

export default function PersonCard({ person }: { person: Person }) {
  return (
    <Link
      href={`/people/${person.id}`}
      className="flex flex-col justify-center items-center p-2 gap-2"
    >
      <img
        src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + person.profile_path}
        alt={person.name}
      />
      <p>{person.name}</p>
    </Link>
  );
}
