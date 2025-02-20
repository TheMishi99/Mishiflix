import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ApiPeopleDTO, ErrorResponse } from "@/types/api-types";
import { DetailedPerson } from "@/types/people-types";

export async function getPopularPeople({
  language,
  page,
}: {
  language: string;
  page: number;
}): Promise<[string | null, ApiPeopleDTO | null]> {
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

    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["An Error Ocurred", null];
  }
}

export async function getPersonDetails({
  person_id,
  language,
}: {
  person_id: number;
  language: string;
}): Promise<[string | null, DetailedPerson | null]> {
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
    console.log(data);

    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["An Error Ocurred", null];
  }
}
