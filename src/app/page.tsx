"use client";

import MainPresentation from "@/components/MainPresentation";
import MainSections from "@/components/MainSections";
import { useUserLogged } from "@/contexts/UserLoggedContext";

export default function HomePage() {
  const { userLogged } = useUserLogged();

  return (
    <main
      id="home"
      className="h-full w-full flex flex-col justify-start items-center overflow-y-auto"
    >
      {userLogged ? <MainSections /> : <MainPresentation />}
    </main>
  );
}
