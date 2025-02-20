"use client";
import {
  usersAddFavoriteMovie,
  usersAddFavoriteSeries,
  usersLogin,
  usersLogout,
  usersSignUp,
} from "@/services/users.services";
import { User } from "@/types/user-types";
import { createContext, useContext, useEffect, useState } from "react";

// Creamos un contexto para el usuario logueado
const UserLoggedContext = createContext<{
  userLogged: User | null;
  error: string | null;
  loading: boolean;
  signUp: ({
    avatar,
    username,
    password,
  }: {
    avatar: string;
    username: string;
    password: string;
  }) => Promise<boolean>;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  addFavoriteMovie: ({
    movie_id,
    movie_title,
  }: {
    movie_id: number;
    movie_title: string;
  }) => Promise<boolean>;
  addFavoriteSeries: ({
    series_id,
    series_title,
  }: {
    series_id: number;
    series_title: string;
  }) => Promise<boolean>;
  logout: () => Promise<boolean>;
}>({
  userLogged: null,
  error: null,
  loading: false,
  signUp: () => Promise.resolve(false),
  login: () => Promise.resolve(false),
  addFavoriteMovie: () => Promise.resolve(false),
  addFavoriteSeries: () => Promise.resolve(false),
  logout: () => Promise.resolve(false),
});

// Creamos un provider para el usuario logueado
export const UserLoggedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Definimos los estados del contexto
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargamos el usuario logueado al iniciar la aplicación
  useEffect(() => {
    setUserLogged(
      JSON.parse(window.sessionStorage.getItem("userLogged") || "null")
    );
    setLoading(false);
  }, []);

  // Funcion para el registro de usuarios
  const signUp = async ({
    avatar,
    username,
    password,
  }: {
    avatar: string;
    username: string;
    password: string;
  }) => {
    // Indicamos que estamos cargando
    setLoading(true);
    setError(null);
    // Llamamos a la función de registro de usuarios
    const [error, success] = await usersSignUp({ avatar, username, password });

    // Si hay un error, lo guardamos en el estado de error y dejamos de cargar
    if (error) {
      setError(error);
      setLoading(false);
      return false;
    }
    // Si el registro fue exitoso, guardamos el usuario en el estado y dejamos de cargar
    if (success) {
      setError(null);
      setLoading(false);
      return true;
    }
    // Si no hubo error ni éxito, dejamos de cargar
    setLoading(false);
    return false;
  };

  // Funcion para el login de usuarios
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    // Indicamos que estamos cargando
    setLoading(true);
    setError(null);

    // Llamamos a la función de login de usuarios
    const [error, user] = await usersLogin({ username, password });

    // Si hay un error, lo guardamos en el estado de error y dejamos de cargar
    if (error) {
      setError(error);
      setLoading(false);
      return false;
    }

    // Si el login fue exitoso, guardamos el usuario en el estado y dejamos de cargar
    if (user) {
      setUserLogged(user);
      setError(null);
      setLoading(false);
      return true;
    }

    // Si no hubo error ni éxito, dejamos de cargar
    setLoading(false);
    return false;
  };

  // Funcion para añadir pelicula favorita
  const addFavoriteMovie = async ({
    movie_id,
    movie_title,
  }: {
    movie_id: number;
    movie_title: string;
  }) => {
    // Indicamos que estamos cargando
    setLoading(true);
    setError(null);

    // Llamamos a la función de añadir pelicula favorita de usuarios
    const [error, newUser] = await usersAddFavoriteMovie({
      movie_id,
      movie_title,
    });

    // Si hay un error, lo guardamos en el estado de error y dejamos de cargar
    if (error) {
      setError(error);
      setLoading(false);
    }

    // Si fue exitoso, actualizamos el estado del usuario y dejamos de cargar
    if (newUser) {
      setUserLogged(newUser);
      setLoading(false);
      return true;
    }
    return false;
  };

  // Funcion para añadir serie favorita
  const addFavoriteSeries = async ({
    series_id,
    series_title,
  }: {
    series_id: number;
    series_title: string;
  }) => {
    // Indicamos que estamos cargando
    setLoading(true);
    setError(null);

    // Llamamos a la función de añadir pelicula favorita de usuarios
    const [error, newUser] = await usersAddFavoriteSeries({
      series_id,
      series_title,
    });

    // Si hay un error, lo guardamos en el estado de error y dejamos de cargar
    if (error) {
      setError(error);
      setLoading(false);
    }

    // Si fue exitoso, actualizamos el estado del usuario y dejamos de cargar
    if (newUser) {
      setUserLogged(newUser);
      setLoading(false);
      return true;
    }
    return false;
  };

  // Funcion para el logout de usuarios
  const logout = async () => {
    // Indicamos que estamos cargando
    setLoading(true);
    setError(null);

    // Llamamos a la función de logout de usuarios
    const [error, success] = await usersLogout();

    // Si hay un error, lo guardamos en el estado de error y dejamos de cargar
    if (error) {
      setError(error);
      setLoading(false);
    }

    // Si el logout fue exitoso, eliminamos el usuario del estado y dejamos de cargar
    if (success) {
      setUserLogged(null);
      setLoading(false);
    }
    return success;
  };

  // Retornamos el provider con el contexto
  return (
    <UserLoggedContext.Provider
      value={{
        userLogged,
        error,
        loading,
        signUp,
        login,
        logout,
        addFavoriteMovie,
        addFavoriteSeries,
      }}
    >
      {children}
    </UserLoggedContext.Provider>
  );
};

// Hook para usar el contexto del usuario logueado
export const useUserLogged = () => useContext(UserLoggedContext);
