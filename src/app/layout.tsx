import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/partials/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserLoggedProvider } from "@/contexts/UserLoggedContext";
import MainNavBar from "@/components/MainNavBar";

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
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <LanguageProvider defaultLanguage="en-US">
          <UserLoggedProvider>
            <div
              id="app"
              className="min-h-dvh flex flex-col p-2 gap-2 overflow-y-scroll"
            >
              <Header />
              <MainNavBar />
              {children}
            </div>
          </UserLoggedProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
