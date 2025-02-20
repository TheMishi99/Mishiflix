import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ApiSeriesResponseDTO, ErrorResponse } from "@/types/api-types";
import { DetailedSerie } from "@/types/series-types";

export async function getSeriesDetails({
  series_id,
  language,
}: {
  series_id: number;
  language: string;
}): Promise<[string | null, DetailedSerie | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/tv/${series_id}?language=${language}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la petición no fue exitosa, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si la petición fue exitosa, obtenemos los datos y los retornamos
    const data: DetailedSerie = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getSeriesList({
  term,
  language,
  page,
}: {
  language: string;
  page: number;
  term: string;
}): Promise<[string | null, ApiSeriesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones para la petición
    const url = `https://api.themoviedb.org/3/search/tv?include_adult=false&query=${term}&language=${language}&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si todo ha ido bien, devolvemos los datos
    const data: ApiSeriesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getAiringTodaySeriesList({
  language,
  page,
}: {
  language: string;
  page: number;
}): Promise<[string | null, ApiSeriesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones para la petición
    const url = `https://api.themoviedb.org/3/tv/airing_today?language=${language}&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si todo ha ido bien, devolvemos los datos
    const data: ApiSeriesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getOnTheAirSeriesList({
  language,
  page,
}: {
  language: string;
  page: number;
}): Promise<[string | null, ApiSeriesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones para la petición
    const url = `https://api.themoviedb.org/3/tv/on_the_air?language=${language}&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si todo ha ido bien, devolvemos los datos
    const data: ApiSeriesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getPopularSeriesList({
  language,
  page,
}: {
  language: string;
  page: number;
}): Promise<[string | null, ApiSeriesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones para la petición
    const url = `https://api.themoviedb.org/3/tv/popular?language=${language}&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si todo ha ido bien, devolvemos los datos
    const data: ApiSeriesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getTopRatedSeriesList({
  language,
  page,
}: {
  language: string;
  page: number;
}): Promise<[string | null, ApiSeriesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones para la petición
    const url = `https://api.themoviedb.org/3/tv/top_rated?language=${language}&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si todo ha ido bien, devolvemos los datos
    const data: ApiSeriesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getFilteredSeriesList({
  genres,
  page,
  language,
  order_by,
  order,
}: {
  genres: number[];
  page: number;
  language: string;
  order_by: string;
  order: string;
}): Promise<[string | null, ApiSeriesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=${page}&sort_by=${order_by}.${order}&with_genres=${genres.join(
      "%2C"
    )}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    // Realizamos la petición
    const response = await fetch(url, options);

    // Si la petición no fue exitosa, lanzamos un error
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.status_message);
    }

    // Si la petición fue exitosa, obtenemos los datos y los retornamos
    const data: ApiSeriesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}
