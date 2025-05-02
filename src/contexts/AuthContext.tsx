"use client";
import { User } from "@/types/user-types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Creamos un contexto para el usuario logueado
const AuthContext = createContext<{
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

  logout: () => Promise<boolean>;
}>({
  userLogged: null,
  error: null,
  loading: false,
  signUp: () => Promise.resolve(false),
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(false),
});

// Creamos un provider para el usuario logueado
export function AuthProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Definimos los estados del contexto
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargamos el usuario logueado al iniciar la aplicación
  useEffect(() => {
    const fetchUserLogged = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          credentials: "include",
          method: "GET",
        });

        if (!response.ok) {
          const error = (await response.json()) as { message: string };
          throw new Error(error.message);
        }

        const { user } = (await response.json()) as { user: User };
        setUserLogged(user);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError("Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLogged();
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
    try {
      // Indicamos que estamos cargando
      setLoading(true);

      // Validamos que los campos no estén vacíos
      if (username === "" || password === "")
        throw new Error("Username and password are required");

      const response = await fetch("/api/auth/sign-up", {
        body: JSON.stringify({ avatar, username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const error = (await response.json()) as { message: string };
        throw new Error(error.message);
      }

      const { user } = (await response.json()) as { user: User };
      setUserLogged(user);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Error creating user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funcion para el login de usuarios
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      // Indicamos que estamos cargando
      setLoading(true);

      // Validamos que los campos no estén vacíos
      if (username === "" || password === "")
        throw new Error("Username and password are required");

      const response = await fetch("/api/auth/login", {
        body: JSON.stringify({ username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (!response.ok) {
        const error = (await response.json()) as { message: string };
        throw new Error(error.message);
      }

      // Guardamos el usuario en sessionStorage
      const { user } = (await response.json()) as { user: User };
      setUserLogged(user);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Error logging in");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funcion para el logout de usuarios
  const logout = async () => {
    try {
      // Indicamos que estamos cargando
      setLoading(true);

      const response = await fetch("/api/auth/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        const error = (await response.json()) as { message: string };
        throw new Error(error.message);
      }

      setUserLogged(null);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Error logging out");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Retornamos el provider con el contexto
  return (
    <AuthContext.Provider
      value={{
        userLogged,
        error,
        loading,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto del usuario logueado
export const useAuth = () => useContext(AuthContext);
