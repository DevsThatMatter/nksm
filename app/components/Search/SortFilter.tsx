import { FilterProps } from "@/app/(root)/search/page";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { MobileFilter } from "./MobileFilter";
export const sortFilterObject = {
  low: "Price: Low to High",
  high: "Price: High to Low",
  newest: "Date: Newest",
  oldest: "Date: Oldest",
};

const SortFilter = ({ query, sorting = "newest", category }: FilterProps) => {
  return (
    <section className="group relative w-[16rem] px-2 max-md:w-[3rem]">
      <button className="z-40 flex w-full items-center justify-around rounded-lg p-1 text-center max-lg:hidden">
        {" "}
        Sort by: {sortFilterObject[sorting]}
        <ChevronDownIcon className="h-5 w-5 group-hover:rotate-180" />
      </button>
      <MobileFilter query={query} sorting={sorting} category={category} />
      <div className="max-lg:hidden">
        <ul className="absolute z-20 hidden w-full rounded-lg border bg-background hover:block group-hover:block">
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
                  <button className="w-full rounded-lg bg-background p-2 hover:bg-muted">
                    {value}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SortFilter;
