"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";

const avatars = [
  {
    id: 1,
    url: "/avatar-1.jpg",
    alt: "avatar-1",
  },
  {
    id: 2,
    url: "/avatar-2.webp",
    alt: "avatar-2",
  },
  {
    id: 3,
    url: "/avatar-3.jpg",
    alt: "avatar-3",
  },
  {
    id: 4,
    url: "/avatar-4.jpg",
    alt: "avatar-4",
  },
];

const signUpTitlesByLanguage = {
  "en-US": {
    signUp: "Sign Up",
    reset: "Reset",
    avatar: "Select your avatar:",
    username: "Username",
    password: "Password",
    linkAlreadyHaveAnAccount: "Already have an account?",
    linkAlreadyHaveAnAccount2: "Login",
  },
  "es-AR": {
    signUp: "Registrarse",
    reset: "Reset",
    avatar: "Selecciona tu avatar:",
    username: "Nombre de usuario",
    password: "Contraseña",
    linkAlreadyHaveAnAccount: "¿Ya tienes una cuenta?",
    linkAlreadyHaveAnAccount2: "Iniciar sesión",
  },
  "fr-FR": {
    signUp: "S'inscrire",
    reset: "Reset",
    avatar: "Sélectionnez votre avatar:",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    linkAlreadyHaveAnAccount: "Vous avez déjà un compte?",
    linkAlreadyHaveAnAccount2: "S'identifier",
  },
};

export default function SignUpForm() {
  const [avatar, setAvatar] = useState<string>("/avatar-1.jpg");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signUp, error } = useAuth();

  const { language } = useLanguage();

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signUpSuccess = signUp({ avatar, username, password });

    if (signUpSuccess) {
      window.location.href = "/";
    } else {
      alert(error);
    }
  };

  const onAvatarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(event.target.value);
  };

  return (
    <form
      id="sign-up-form"
      className="w-full max-w-[300px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-900 rounded-xl"
      onSubmit={handleSignUpSubmit}
      role="form"
    >
      <h2 className="text-3xl">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].signUp
        }
      </h2>
      <div className="flex flex-col justify-center items-start p-2 gap-2">
        <label htmlFor="avatar">
          {
            signUpTitlesByLanguage[
              language as keyof typeof signUpTitlesByLanguage
            ].avatar
          }
        </label>
        <ul id="avatars" className="grid grid-cols-4 p-2 gap-2">
          {avatars.map((avatar) => (
            <li
              key={avatar.id}
              className="flex flex-col justify-center items-center gap-2"
            >
              <Avatar src={avatar.url} alt={avatar.alt} />
              <input
                type="radio"
                name="avatar"
                value={avatar.url}
                onChange={onAvatarInputChange}
                defaultChecked={avatar.id === 1}
              />
            </li>
          ))}
        </ul>
      </div>
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
      <Button type="submit" variant="primary">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].signUp
        }
      </Button>
      <Button type="reset" variant="secondary">
        {
          signUpTitlesByLanguage[
            language as keyof typeof signUpTitlesByLanguage
          ].reset
        }
      </Button>
      <div className="flex justify-center items-center gap-2">
        <span>
          {
            signUpTitlesByLanguage[
              language as keyof typeof signUpTitlesByLanguage
            ].linkAlreadyHaveAnAccount
          }
        </span>
        <Link href="/auth/login" className="text-red-600 hover:underline">
          {
            signUpTitlesByLanguage[
              language as keyof typeof signUpTitlesByLanguage
            ].linkAlreadyHaveAnAccount2
          }
        </Link>
      </div>
    </form>
  );
}
