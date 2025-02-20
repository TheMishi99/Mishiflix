import { Person } from "@/types/people-types";
import PersonCard from "./PersonCard";

export default function PeopleGrid({ peopleList }: { peopleList: Person[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-2 gap-2">
      {peopleList.map((person) => (
        <li key={person.id + person.name}>
          <PersonCard person={person} />
        </li>
      ))}
    </ul>
  );
}
