"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  // Estado para almacenar el username y password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Hook para obtener la función de login y el error
  const { error, login } = useUserLogged();

  // Obtener el idioma actual de la aplicación
  const { language } = useLanguage();

  // Títulos de los campos del formulario de login por idioma
  const loginTitlesByLanguage = {
    "en-US": {
      login: "Login",
      username: "Username",
      password: "Password",
      linkForgotPassword: "Forgot password?",
      linkForgotPassword2: "Click here",
      linkSignUp: "Don't have an account?",
      linkSignUp2: "Sign Up",
    },
    "es-AR": {
      login: "Iniciar sesión",
      username: "Nombre de usuario",
      password: "Contraseña",
      linkForgotPassword: "¿Olvidaste tu contraseña?",
      linkForgotPassword2: "Haz click aquí",
      linkSignUp: "¿No tienes cuenta?",
      linkSignUp2: "Regístrate",
    },
    "fr-FR": {
      login: "S'identifier",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      linkForgotPassword: "Mot de passe oublié?",
      linkForgotPassword2: "Cliquez ici",
      linkSignUp: "Vous n'avez pas de compte?",
      linkSignUp2: "S'inscrire",
    },
  };

  // Función para manejar el submit del formulario
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Evitar que el formulario recargue la página
    event.preventDefault();

    // Llamar a la función de login con los datos del formulario
    const loginSucess = await login({ username, password });

    // Si el login fue exitoso, redirigir al usuario a la página principal,
    //  caso contrario, mostrar un mensaje de error
    if (loginSucess) {
      window.location.href = "/";
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
      <h2 className="text-2xl">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .login
        }
      </h2>
      <label htmlFor="username" className="w-full">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .username
        }
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="test"
        className="w-full p-2 rounded-xl bg-zinc-800"
        onChange={(event) => setUsername(event.target.value)}
        aria-required="true"
        required
      />
      <label htmlFor="password" className="w-full">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .password
        }
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="test"
        className="w-full p-2 rounded-xl bg-zinc-800"
        onChange={(event) => setPassword(event.target.value)}
        aria-required="true"
        required
      />
      <button type="submit" className="p-2 rounded-xl bg-red-600">
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .login
        }
      </button>
      <p>
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .linkForgotPassword
        }{" "}
        <Link href="/" className="text-red-600">
          {
            loginTitlesByLanguage[
              language as keyof typeof loginTitlesByLanguage
            ].linkForgotPassword2
          }
        </Link>
      </p>
      <p>
        {
          loginTitlesByLanguage[language as keyof typeof loginTitlesByLanguage]
            .linkSignUp
        }{" "}
        <Link href="/auth/sign-up" className="text-red-600">
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
