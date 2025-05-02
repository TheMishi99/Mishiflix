"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse, ApiPeopleDTO } from "@/types/api-types";
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
      try {
        const url = `https://api.themoviedb.org/3/person/popular?language=${language}&page=${page}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorResponse: ErrorResponse = await response.json();
          throw new Error(errorResponse.status_message);
        }
        const data: ApiPeopleDTO = await response.json();
        setPeople(data.results);
        setActualPage(data.page);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularPeople();
  }, [language, page]);

  return { people, isLoading, isError, totalPages, totalResults, actualPage };
}
