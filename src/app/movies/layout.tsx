import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { NavBarItem } from "@/types/other-types";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navBarItems: NavBarItem[] = [
    { render_condition: true, url: "/movies/popular", title: "Popular Movies" },
    {
      render_condition: true,
      url: "/movies/top-rated",
      title: "Top Rated Movies",
    },
    {
      render_condition: true,
      url: "/movies/now-playing",
      title: "Now Playing Movies",
    },
    {
      render_condition: true,
      url: "/movies/upcoming",
      title: "Upcoming Movies",
    },
  ];
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      <SearchBar submit_url="/movies/search" />
      <NavBar navBarItems={navBarItems} />
      {children}
    </div>
  );
}
