"use client";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePerson from "@/hooks/people/usePerson";
import { useParams } from "next/navigation";

export default function PersonDetailsPage() {
  const { person_id } = useParams();
  const { language } = useLanguage();
  const {
    person,
    isLoading: personLoading,
    isError: personError,
  } = usePerson({ person_id: Number(person_id), language });

  return (
    <div className="flex justify-center items-center p-2 gap-2">
      {personLoading ? (
        <Spinner />
      ) : personError ? (
        <p>{personError}</p>
      ) : (
        person && (
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start p-2 gap-2">
            <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
              <img
                src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + person.profile_path}
                alt={person.name}
              />
              <h3 className="text-xl">{person.name}</h3>
            </div>
            <div className="flex flex-col justify-center items-start p-2 gap-2">
              <p>
                <strong>Biography</strong>: {person.biography}
              </p>
              <p>
                <strong>Birthday</strong>: {person.birthday}
              </p>
              <p>
                <strong>Place of Birth</strong>: {person.place_of_birth}
              </p>
              <p>
                <strong>Popularity</strong>: {person.popularity}
              </p>
              <p>
                <strong>Also Known As</strong>:{" "}
                {person.also_known_as.join(", ")}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
