"use client";
import {
  ApiErrorResponse,
  ApiUserResponse,
  LoginDTO,
  SignUpDTO,
} from "@/types/api-types";
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
  isError: string | null;
  isLoading: boolean;
  signUp: (signUpCredentials: SignUpDTO) => Promise<boolean>;
  login: (loginCredentials: LoginDTO) => Promise<boolean>;

  logout: () => Promise<boolean>;
}>({
  userLogged: null,
  isError: null,
  isLoading: false,
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
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cargamos el usuario logueado al iniciar la aplicación
  useEffect(() => {
    const fetchUserLogged = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          credentials: "include",
          method: "GET",
        });

        if (!response.ok) {
          const error = (await response.json()) as ApiErrorResponse;
          throw new Error(error.message);
        }

        const { user } = (await response.json()) as ApiUserResponse;
        setUserLogged(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
      setIsLoading(true);

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
        const error = (await response.json()) as ApiErrorResponse;
        throw new Error(error.message);
      }

      const { user } = (await response.json()) as ApiUserResponse;
      setUserLogged(user);
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error creating user");
      return false;
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);

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
        const error = (await response.json()) as ApiErrorResponse;
        throw new Error(error.message);
      }

      // Guardamos el usuario en sessionStorage
      const { user } = (await response.json()) as ApiUserResponse;
      setUserLogged(user);
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error logging in");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Funcion para el logout de usuarios
  const logout = async () => {
    try {
      // Indicamos que estamos cargando
      setIsLoading(true);

      const response = await fetch("/api/auth/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        const error = (await response.json()) as ApiErrorResponse;
        throw new Error(error.message);
      }

      setUserLogged(null);
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error logging out");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Retornamos el provider con el contexto
  return (
    <AuthContext.Provider
      value={{
        userLogged,
        isError,
        isLoading,
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
