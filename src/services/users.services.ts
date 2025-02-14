import { User } from "@/types/my-types"; // importamos el tipo User
import bcryptjs from "bcryptjs"; // npm install bcryptjs (libreria para encriptar contraseñas)

export async function usersSignUp({
  avatar,
  username,
  password,
}: {
  avatar: string;
  username: string;
  password: string;
}): Promise<[string | null, boolean]> {
  try {
    // Validamos que los campos no estén vacíos
    if (username === "" || password === "")
      throw new Error("Username and password are required");

    // Obtenemos los usuarios locales (localStorage)
    const localUsers: User[] = JSON.parse(
      window.localStorage.getItem("localUsers") || "[]"
    );

    // Validamos que el usuario no exista
    const userExists = localUsers.some((user) => user.username === username);
    if (userExists) throw new Error("User already exists");

    // Creamos un nuevo usuario
    const newUser: User = {
      favoriteMovies: [],
      favoriteSeries: [],
      avatar,
      username,
      password: bcryptjs.hashSync(password, 12),
    };

    // Guardamos el nuevo usuario en localStorage
    localUsers.push(newUser);
    window.localStorage.setItem("localUsers", JSON.stringify(localUsers));

    // Guardamos el usuario en sessionStorage
    window.sessionStorage.setItem("userLogged", JSON.stringify(newUser));
    return [null, true];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, false];
    }
    return ["An error occurred", false];
  }
}

export async function usersLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<[string | null, User | null]> {
  try {
    // Validamos que los campos no estén vacíos
    if (username === "" || password === "")
      throw new Error("Username and password are required");

    // Obtenemos los usuarios locales (localStorage)
    const localUsers: User[] = JSON.parse(
      window.localStorage.getItem("localUsers") || "[]"
    );

    // Validamos que el usuario exista y la contraseña sea correcta
    const user = localUsers.find(
      (user) =>
        user.username === username &&
        bcryptjs.compareSync(password, user.password)
    );

    // Si el usuario no existe o la contraseña es incorrecta, lanzamos un error
    if (!user) {
      throw new Error("User not found");
    }

    // Caso contrario, guardamos el usuario en sessionStorage
    window.sessionStorage.setItem("userLogged", JSON.stringify(user));
    return [null, user];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    return ["An error occurred", null];
  }
}

export async function usersAddFavoriteMovie({
  movie_id,
}: {
  movie_id: number;
}): Promise<[string | null, User | null]> {
  try {
    const userLogged = JSON.parse(
      window.sessionStorage.getItem("userLogged") || "null"
    ) as User | null;
    if (!userLogged) throw new Error("User not found");
    let newUser: User = { ...userLogged };
    if (userLogged.favoriteMovies.includes(movie_id)) {
      newUser.favoriteMovies = userLogged.favoriteMovies.filter(
        (movie) => movie !== movie_id
      );
    } else {
      newUser.favoriteMovies.push(movie_id);
    }
    window.sessionStorage.setItem("userLogged", JSON.stringify(newUser));
    return [null, newUser];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    return ["An error occurred", null];
  }
}

export async function usersAddFavoriteSeries({
  series_id,
}: {
  series_id: number;
}): Promise<[string | null, User | null]> {
  try {
    const userLogged = JSON.parse(
      window.sessionStorage.getItem("userLogged") || "null"
    ) as User | null;
    if (!userLogged) throw new Error("User not found");
    let newUser: User = { ...userLogged };
    if (userLogged.favoriteSeries.includes(series_id)) {
      newUser.favoriteSeries = userLogged.favoriteSeries.filter(
        (movie) => movie !== series_id
      );
    } else {
      newUser.favoriteSeries.push(series_id);
    }
    window.sessionStorage.setItem("userLogged", JSON.stringify(newUser));
    return [null, newUser];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    return ["An error occurred", null];
  }
}

export async function usersLogout(): Promise<[string | null, boolean]> {
  try {
    // Obtenemos el usuario de sessionStorage
    const user = JSON.parse(
      window.sessionStorage.getItem("userLogged") || "null"
    ) as User | null;

    // Si el usuario no existe, lanzamos un error
    if (!user) throw new Error("User not found");

    // Caso contrario, eliminamos el usuario de sessionStorage
    window.sessionStorage.removeItem("userLogged");
    return [null, true];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, false];
    }
    return ["An error occurred", false];
  }
}
