import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse, GenresDTO } from "@/types/my-types";

export async function getGenres({
  language,
}: {
  language: string;
}): Promise<[string | null, GenresDTO | null]> {
  try {
    // Preparamos la URL y las opciones para la petición
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`;
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
    const data: GenresDTO = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}
