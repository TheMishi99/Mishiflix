"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { Check, Dot, UserCircle } from "lucide-react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

// Títulos de los campos del formulario de login por idioma
const loginTitlesByLanguage = {
  "en-US": {
    welcome: "Welcome!",
    login: "Login",
    username: "Username",
    password: "Password",
    reset: "Reset",
    remember: "Remember me",
    linkForgotPassword: "Forgot password?",
    linkForgotPassword2: "Click here",
    linkSignUp: "Don't have an account?",
    linkSignUp2: "Sign Up",
  },
  "es-AR": {
    welcome: "Bienvenido!",
    login: "Iniciar sesión",
    username: "Nombre de usuario",
    password: "Contraseña",
    reset: "Reset",
    remember: "Recuerdame",
    linkForgotPassword: "¿Olvidaste tu contraseña?",
    linkForgotPassword2: "Haz click aquí",
    linkSignUp: "¿No tienes cuenta?",
    linkSignUp2: "Regístrate",
  },
  "fr-FR": {
    welcome: "Bienvenue!",
    login: "S'identifier",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    reset: "Reset",
    remember: "Se souvenir de moi",
    linkForgotPassword: "Mot de passe oublié?",
    linkForgotPassword2: "Cliquez ici",
    linkSignUp: "Vous n'avez pas de compte?",
    linkSignUp2: "S'inscrire",
  },
};

export default function LoginForm() {
  // Estado para almacenar el username y password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const router = useRouter();

  // Hook para obtener la función de login y el error
  const { isError: error, login } = useAuth();

  // Obtener el idioma actual de la aplicación
  const { language } = useLanguage();

  // Función para manejar el submit del formulario
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginSucess = await login({ username, password });

    if (loginSucess) {
      router.push("/");
    } else {
      alert(error);
    }
  };

  // Renderizar el formulario de login
  return (
    <form
      id="login-form"
      className="w-full max-w-[300px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-900 rounded-xl"
      onSubmit={handleLoginSubmit}
      role="form"
    >
      <h2 className="text-3xl">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .welcome
        }
      </h2>
      <UserCircle color="white" className="size-28" />
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="w-full p-2 rounded-xl bg-zinc-800"
          onChange={(event) => setUsername(event.target.value)}
          aria-required="true"
          required
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full p-2 rounded-xl bg-zinc-800"
          onChange={(event) => setPassword(event.target.value)}
          aria-required="true"
          required
        />
      </div>
      <div className="self-start flex justify-center items-center p-2 gap-2">
        <input
          type="checkbox"
          name="remember"
          id="remember"
          value="true"
          aria-required="false"
          className="hidden peer"
          onChange={(event) => setRemember(event.target.checked)}
        />
        <label
          htmlFor="remember"
          className="flex justify-center items-center border-2 border-red-700 rounded-md peer-checked:bg-red-700"
        >
          {remember ? <Check color="white" /> : <Dot color="white" />}
        </label>
        <span>
          {
            loginTitlesByLanguage[
              language as keyof typeof loginTitlesByLanguage
            ].remember
          }
        </span>
      </div>
      <Button type="submit" variant="primary">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .login
        }
      </Button>
      <Button type="reset" variant="secondary">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .reset
        }
      </Button>
      <div className="flex justify-center items-center gap-2">
        <span>
          {
            loginTitlesByLanguage[
              language as keyof typeof loginTitlesByLanguage
            ].linkForgotPassword
          }
        </span>
        <Link href="/" className="text-red-600 hover:underline">
          {
            loginTitlesByLanguage[
              language as keyof typeof loginTitlesByLanguage
            ].linkForgotPassword2
          }
        </Link>
      </div>
      <p>
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .linkSignUp
        }{" "}
        <Link href="/auth/sign-up" className="text-red-600 hover:underline">
          {
            loginTitlesByLanguage[
              language as keyof typeof loginTitlesByLanguage
            ].linkSignUp2
          }
        </Link>
      </p>
    </form>
  );
}
