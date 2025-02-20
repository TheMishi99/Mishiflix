import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { NavBarItem } from "@/types/other-types";

export default function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navBarItems: NavBarItem[] = [
    { render_condition: true, url: "/series/popular", title: "Popular Series" },
    {
      render_condition: true,
      url: "/series/top-rated",
      title: "Top Rated Series",
    },
    {
      render_condition: true,
      url: "/series/on-the-air",
      title: "On The Air Series",
    },
    {
      render_condition: true,
      url: "/series/airing-today",
      title: "Airing Today Series",
    },
  ];
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {" "}
      <SearchBar submit_url="/series/search" />
      <NavBar navBarItems={navBarItems} />
      {children}
    </div>
  );
}
