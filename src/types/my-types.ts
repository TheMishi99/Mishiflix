export type ErrorResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};
export type MoviesDTO = {
  dates: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Dates = {
  maximum: string;
  minimum: string;
};

export type MovieDetailed = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Belongstocollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Spokenlanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Productioncountry = {
  iso_3166_1: string;
  name: string;
};

type Productioncompany = {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
};

export type Genre = {
  id: number;
  name: string;
};

type Belongstocollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type User = {
  avatar: string;
  username: string;
  password: string;
  favoriteMovies: number[];
  favoriteSeries: number[];
};

export type GenresDTO = {
  genres: Genre[];
};
