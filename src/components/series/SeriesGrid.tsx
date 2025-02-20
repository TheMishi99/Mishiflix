import { Series } from "@/types/series-types";
import SeriesCard from "./SeriesCard";

export default function SeriesGrid({ seriesList }: { seriesList: Series[] }) {
  return (
    <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
      {seriesList.map((series) => (
        <li
          key={series.id + series.name}
          className="group overflow-hidden rounded-xl group bg-gray-800 relative"
        >
          <SeriesCard series={series} />
        </li>
      ))}
    </ul>
  );
}
