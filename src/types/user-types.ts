export type User = {
  avatar: string;
  username: string;
  password: string;
  favoriteMovies: favoriteMedia[];
  favoriteSeries: favoriteMedia[];
};

type favoriteMedia = {
  id: number;
  title: string;
};
