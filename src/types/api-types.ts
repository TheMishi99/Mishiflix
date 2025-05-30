import { Genre } from "./media-types";
import { Movie } from "./movie-types";
import { Person } from "./people-types";
import { Series } from "./series-types";
import { User } from "./user-types";

export type ErrorResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};
export type ApiMoviesResponseDTO = {
  dates?: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type Dates = {
  maximum: string;
  minimum: string;
};

export type GenresDTO = {
  genres: Genre[];
};

export type ApiSeriesResponseDTO = {
  page: number;
  results: Series[];
  total_pages: number;
  total_results: number;
};

export type ApiPeopleDTO = {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
};

export type ApiErrorResponse = {
  message: string;
};

export type ApiUserResponse = {
  user: User;
};

export type LoginDTO = Pick<User, "username" | "password">;

export type SignUpDTO = Omit<User, "_id">;
