import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ApiMoviesResponseDTO, ErrorResponse } from "@/types/api-types";
import { DetailedMovie } from "@/types/movie-types";

export async function getNowPlayingMovies({
  page,
  language,
}: {
  page: number;
  language: string;
}): Promise<[string | null, ApiMoviesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=${language}&page=${page}`;
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
    const data: ApiMoviesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getPopularMovies({
  page,
  language,
}: {
  page: number;
  language: string;
}): Promise<[string | null, ApiMoviesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=${language}&page=${page}`;
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
    const data: ApiMoviesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getTopRatedMovies({
  page,
  language,
}: {
  page: number;
  language: string;
}): Promise<[string | null, ApiMoviesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=${page}`;
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

    // Si la petición fue exitosa, obtenemos los datos y los
    const data: ApiMoviesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getUpcomingMovies({
  page,
  language,
}: {
  page: number;
  language: string;
}): Promise<[string | null, ApiMoviesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`;
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

    // Si la petición fue exitosa, obtenemos los datos y los
    const data: ApiMoviesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getMovies({
  term,
  page,
  language,
}: {
  term: string;
  page: number;
  language: string;
}): Promise<[string | null, ApiMoviesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=${language}&page=${page}`;
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
    const data: ApiMoviesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getFilteredMovies({
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
}): Promise<[string | null, ApiMoviesResponseDTO | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=${order_by}.${order}&with_genres=${genres.join(
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
    const data: ApiMoviesResponseDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}

export async function getMovieDetails({
  movie_id,
  language,
}: {
  movie_id: number;
  language: string;
}): Promise<[string | null, DetailedMovie | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=${language}`;
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
    const data: DetailedMovie = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}
