"use client";
import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse } from "@/types/api-types";
import { DetailedPerson } from "@/types/people-types";
import { useEffect, useState } from "react";

export default function usePerson({
  person_id,
  language,
}: {
  person_id: number;
  language: string;
}): {
  person: DetailedPerson | null;
  isLoading: boolean;
  isError: string | null;
} {
  const [person, setPerson] = useState<DetailedPerson | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/person/${person_id}?language=${language}`;
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
        const data: DetailedPerson = await response.json();
        setPerson(data);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersonDetails();
  }, [person_id, language]);
  return { person, isLoading, isError };
}
