"use client";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePerson from "@/hooks/people/usePerson";
import { useParams } from "next/navigation";
import Image from "next/image";

const titlesByLanguage = {
  "en-US": {
    biography: "Biography",
    birthday: "Birthday",
    deathday: "Deathday",
    place_of_birth: "Place of birth",
    popularity: "Popularity",
    alsoKnownAs: "Also Known As",
  },
  "es-AR": {
    biography: "Biografía",
    birthday: "Cumpleaños",
    deathday: "Fallecimiento",
    place_of_birth: "Lugar de nacimiento",
    popularity: "Popularidad",
    alsoKnownAs: "También conocido como",
  },
  "fr-FR": {
    biography: "Biographie",
    birthday: "Anniversaire",
    deathday: "Décès",
    place_of_birth: "Lieu de naissance",
    popularity: "Popularité",
    alsoKnownAs: "Surnom",
  },
};

export default function PersonDetailsPage() {
  const { person_id } = useParams();
  const { language } = useLanguage();
  const {
    person,
    isLoading: personLoading,
    isError: personError,
  } = usePerson({ person_id: Number(person_id), language });

  if (personLoading) return <Spinner />;
  if (personError) return <p>{personError}</p>;
  if (!person) return <p>No person found</p>;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start p-2 gap-2">
      <div className="flex flex-col justify-center items-center p-2 gap-2">
        <Image
          src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + person.profile_path}
          alt={person.name}
          width={100000}
          height={100000}
          className="w-48 aspect-[2/3]"
        />
        <h3 className="text-xl">{person.name}</h3>
      </div>
      <div className="w-full sm:w-2/3 flex flex-col justify-center items-start p-2 gap-2">
        <p className="w-full">
          <strong>
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .biography
            }
          </strong>
          : {person.biography}
        </p>
        <p className="w-full">
          <strong>
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .birthday
            }
          </strong>
          : {person.birthday}
        </p>
        <p className="w-full">
          <strong>
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .place_of_birth
            }
          </strong>
          : {person.place_of_birth}
        </p>
        <p className="w-full">
          <strong>
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .popularity
            }
          </strong>
          : {person.popularity}
        </p>
        <p className="w-full">
          <strong>
            {
              titlesByLanguage[language as keyof typeof titlesByLanguage]
                .alsoKnownAs
            }
          </strong>
          : {person.also_known_as.join(", ")}
        </p>
      </div>
    </div>
  );
}
