"use client";
import MediasSlideableList from "@/components/medias/MediasSlideableList";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularPeople from "@/hooks/people/usePopularPeople";
import Link from "next/link";
import { useMemo } from "react";

const seeMoreTextByLanguage = {
  "en-US": "See more",
  "es-AR": "Ver mas",
  "fr-FR": "Voir plus",
};

const sectionsByLanguage = {
  "en-US": { popular: "Popular" },
  "es-AR": { popular: "Populares" },
  "fr-FR": { popular: "Populaires" },
};

export default function PeoplePage() {
  const { language } = useLanguage();

  const {
    people: popularPeople,
    isLoading: popularPeopleLoading,
    isError: popularPeopleError,
  } = usePopularPeople({ page: 1, language });

  const sections = useMemo(
    () => [
      {
        id: 1,
        title:
          sectionsByLanguage[language as keyof typeof seeMoreTextByLanguage]
            .popular,
        people: popularPeople,
        url: "/people/popular",
      },
    ],
    [language, popularPeople]
  );

  if (popularPeopleLoading) return <Spinner />;
  if (popularPeopleError) return <p>{popularPeopleError}</p>;

  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2">
      {sections.map((section) => (
        <section
          key={section.id}
          className="flex flex-col justify-center items-start p-2 gap-2 w-full"
        >
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <Link
              href={section.url}
              className="flex justify-center items-center p-2 gap-2 border border-zinc-800 rounded-xl"
            >
              {
                seeMoreTextByLanguage[
                  language as keyof typeof seeMoreTextByLanguage
                ]
              }
            </Link>
          </div>
          <MediasSlideableList
            medias={section.people.map((p) => {
              return {
                id: p.id,
                image: p.profile_path,
                url: `/movies/${p.id}`,
                title: p.name,
                overview:
                  "Known for: " + p.known_for.map((kf) => kf.title).join(", "),
              };
            })}
          />
        </section>
      ))}
    </div>
  );
}
