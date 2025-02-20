"use client";
import PageButtons from "@/components/PageButtons";
import PeopleGrid from "@/components/people/PeopleGrid";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularPeople from "@/hooks/people/usePopularPeople";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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
          <PeopleGrid peopleList={people} />
        </PageButtons>
      )}
    </div>
  );
}

export default function PopularPeopleMainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <PopularPeoplePage />
    </Suspense>
  );
}
