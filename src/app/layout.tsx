import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/partials/Header";
import Image from "next/image";
import Link from "next/link";
import TMDB_Logo from "../../public/tmdb.svg";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserLoggedProvider } from "@/contexts/UserLoggedContext";
import NavBar from "@/components/NavBar";
import { NavBarItem } from "@/types/other-types";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mishiflix | Oficial Site",
  description: "Welcome to Mishiflix! Watch your favorite movies and TV shows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navBarItems: NavBarItem[] = [
    { render_condition: true, title: "Movies", url: "/movies" },
    { render_condition: true, title: "Series", url: "/series" },
    { render_condition: true, title: "People", url: "/people" },
  ];
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <LanguageProvider defaultLanguage="en-US">
          <UserLoggedProvider>
            <div
              id="app"
              className="h-dvh flex flex-col p-2 gap-2 relative overflow-y-scroll"
            >
              <Header />
              <NavBar navBarItems={navBarItems} />
              {children}
              <div
                id="sponsor"
                className="absolute bottom-5 right-5 size-16 flex flex-col justify-center items-center bg-white p-2 rounded-xl gap-2"
              >
                <Link href="https://www.themoviedb.org" className="flex">
                  <Image src={TMDB_Logo} alt={"TMDB Logo"} />
                </Link>
              </div>
            </div>
          </UserLoggedProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
