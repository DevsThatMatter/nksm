import { FilterProps } from "@/app/(root)/search/page";
import Link from "next/link";

export const sortFilterObject = {
  low: "Price: Low to High",
  high: "Price: High to Low",
  newest: "Date: Newest",
  oldest: "Date: Oldest",
};

const SortFilter = ({ query, sorting = "newest", category }: FilterProps) => {
  return (
    <section className="relative w-56 px-2">
      <button className="peer z-40 w-[13.5rem] rounded-lg border p-1 text-center">
        {" "}
        Sort by: {sortFilterObject[sorting]}
      </button>

      <ul className="absolute z-20 hidden w-[13.5rem] rounded-lg border bg-background hover:block active:opacity-0 peer-hover:block">
        {Object.entries(sortFilterObject).map(([key, value]) => {
          if (key === sorting) return null;
          return (
            <li key={key}>
              <Link
                href={{
                  query: {
                    q: query,
                    sortBy: key,
                    category: category,
                  },
                }}
                replace
              >
                <button className="w-full bg-background p-2 hover:bg-gray-200">
                  {value}
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SortFilter;
