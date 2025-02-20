import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { NavBarItem } from "@/types/other-types";

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navBarItems: NavBarItem[] = [
    { render_condition: true, url: "/people/popular", title: "Popular People" },
  ];
  return (
    <div className="w-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      <SearchBar submit_url="/people/search" />
      <NavBar navBarItems={navBarItems} />
      {children}
    </div>
  );
}
