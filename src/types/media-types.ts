export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type GuestStar = {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type Crew = {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};
