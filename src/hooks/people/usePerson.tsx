"use client";
import { getPersonDetails } from "@/services/people.services";
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
      const [error, data] = await getPersonDetails({ person_id, language });
      if (error) setIsError(error);
      if (data) setPerson(data);
      setIsLoading(false);
    };
    fetchPersonDetails();
  }, [person_id, language]);
  return { person, isLoading, isError };
}
