"use client";
import PeopleGrid from "@/components/people/PeopleGrid";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import usePopularPeople from "@/hooks/people/usePopularPeople";

export default function PeoplePage() {
  const { language } = useLanguage();
  const {
    people,
    isLoading: peopleLoading,
    isError: peopleError,
  } = usePopularPeople({ page: 1, language });
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2">
      <h2 className="text-2xl">Popular People</h2>
      {peopleLoading ? (
        <Spinner />
      ) : peopleError ? (
        <p>{peopleError}</p>
      ) : (
        <PeopleGrid peopleList={people} />
      )}
    </div>
  );
}
