"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import { useLanguage } from "@/contexts/LanguageContext";

const avatars = [
  {
    url: "/avatar-1.jpg",
    alt: "avatar-1",
  },
  {
    url: "/avatar-2.webp",
    alt: "avatar-2",
  },
  {
    url: "/avatar-3.jpg",
    alt: "avatar-3",
  },
  {
    url: "/avatar-4.jpg",
    alt: "avatar-4",
  },
];

export default function SignUpForm() {
  const [avatar, setAvatar] = useState<string>("/avatar-1.jpg");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signUp, error } = useUserLogged();

  const { language } = useLanguage();

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const signUpSuccess = await signUp({ avatar, username, password });
    if (signUpSuccess) {
      window.location.href = "/";
    } else {
      alert(error);
    }
  };

  const onAvatarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(event.target.value);
  };

  const signUpTitlesByLanguage = {
    "en-US": {
      signUp: "Sign Up",
      avatar: "Select your avatar:",
      username: "Username",
      password: "Password",
      linkAlreadyHaveAnAccount: "Already have an account?",
      linkAlreadyHaveAnAccount2: "Login",
    },
    "es-AR": {
      signUp: "Registrarse",
      avatar: "Selecciona tu avatar:",
      username: "Nombre de usuario",
      password: "Contraseña",
      linkAlreadyHaveAnAccount: "¿Ya tienes una cuenta?",
      linkAlreadyHaveAnAccount2: "Iniciar sesión",
    },
    "fr-FR": {
      signUp: "S'inscrire",
      avatar: "Sélectionnez votre avatar:",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      linkAlreadyHaveAnAccount: "Vous avez déjà un compte?",
      linkAlreadyHaveAnAccount2: "S'identifier",
    },
  };

  return (
    <form
      id="sign-up-form"
      className="w-full max-w-[300px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-900 rounded-xl"
      onSubmit={handleSignUpSubmit}
      role="form"
    >
      <h2 className="text-2xl">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].signUp
        }
      </h2>
      <label htmlFor="avatar">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].avatar
        }
      </label>
      <div id="avatars" className="flex justify-center items-center p-2 gap-2">
        {avatars.map((avatar, index) => (
          <div
            key={index + avatar.alt}
            className="flex flex-col justify-center items-center gap-2"
          >
            <Image
              src={avatar.url}
              alt={avatar.alt}
              width={60}
              height={60}
              className="rounded-full"
            />
            <input
              type="radio"
              name="avatar"
              value={avatar.url}
              onChange={onAvatarInputChange}
              defaultChecked={index === 0}
            />
          </div>
        ))}
      </div>
      <label htmlFor="username" className="w-full">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].username
        }
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="test"
        className="w-full p-2 rounded-xl bg-zinc-800"
        onChange={(event) => setUsername(event.target.value)}
      />
      <label htmlFor="password" className="w-full">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].password
        }
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="test"
        className="w-full p-2 rounded-xl bg-zinc-800"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" className="p-2 rounded-xl bg-red-600">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].signUp
        }
      </button>
      <p>
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].linkAlreadyHaveAnAccount
        }
        <Link href="/auth/login" className="text-red-600">
          {
            signUpTitlesByLanguage[
              language as keyof typeof signUpTitlesByLanguage
            ].linkAlreadyHaveAnAccount2
          }
        </Link>
      </p>
    </form>
  );
}
