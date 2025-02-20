"use client";
import { getPopularPeople } from "@/services/people.services";
import { Person } from "@/types/people-types";
import { useEffect, useState } from "react";

export default function usePopularPeople({
  language,
  page,
}: {
  language: string;
  page: number;
}): {
  actualPage: number;
  totalPages: number;
  totalResults: number;
  people: Person[];
  isLoading: boolean;
  isError: string | null;
} {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  useEffect(() => {
    const fetchPopularPeople = async () => {
      const [error, data] = await getPopularPeople({ language, page });
      if (error) setIsError(error);
      if (data) {
        setPeople(data.results);
        setActualPage(data.page);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      }
      setIsLoading(false);
    };
    fetchPopularPeople();
  }, [language, page]);
  return { people, isLoading, isError, totalPages, totalResults, actualPage };
}
