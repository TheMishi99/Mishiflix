import { NEXT_PUBLIC_TMDB_API_KEY } from "@/app.config";
import { ErrorResponse } from "@/types/api-types";
import { DetailedSeason } from "@/types/season-types";

export async function getSeasonDetails({
  series_id,
  season_number,
  language,
}: {
  series_id: number;
  season_number: number;
  language: string;
}): Promise<[string | null, DetailedSeason | null]> {
  try {
    // Preparamos la URL y las opciones de la petición
    const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?language=${language}`;
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
    const data: DetailedSeason = await response.json();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Something went wrong", null];
  }
}
