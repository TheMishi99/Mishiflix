"use client";
import MediasGrid from "@/components/medias/MediasGrid";
import PageButtons from "@/components/PageButtons";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularPeople from "@/hooks/people/usePopularPeople";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PopularPeoplePage() {
  const { language } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const params = useSearchParams();
  const {
    people,
    isLoading: peopleLoading,
    isError: peopleError,
    actualPage,
    totalPages,
  } = usePopularPeople({ page, language });

  useEffect(() => {
    setPage(Number(params.get("page")) || 1);
  }, [params]);
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2">
      <h2 className="text-2xl">Popular People</h2>
      {peopleLoading ? (
        <Spinner />
      ) : peopleError ? (
        <p>{peopleError}</p>
      ) : (
        <PageButtons
          totalPages={totalPages}
          actualPage={actualPage}
          baseUrl="/people/popular?"
        >
          <MediasGrid
            medias={people.map((p) => {
              return {
                id: p.id,
                image: p.profile_path,
                url: `/people/${p.id}`,
                title: p.name,
                overview: p.known_for
                  .map((kf) => (kf.name ? kf.name : kf.title ? kf.title : null))
                  .join(", "),
              };
            })}
          />
        </PageButtons>
      )}
    </div>
  );
}

export default function PopularPeopleMainPage() {
  return <PopularPeoplePage />;
}
