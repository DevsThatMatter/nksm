"use client";
import Link from "next/link";
import { useState } from "react";

interface SortFilterProps {
  q: string;
}
const SortFilter = ({ q }: SortFilterProps) => {
  const sortFilter = [
    {
      name: "Price: Low to High",
      sortBy: "Price",
      sort: 1,
    },
    {
      name: "Price: High to Low",
      sortBy: "Price",
      sort: -1,
    },
    {
      name: "Date: Newest",
      sortBy: "createdAt",
      sort: -1,
    },
    {
      name: "Date: Oldest",
      sortBy: "createdAt",
      sort: 1,
    },
  ];
  const [openList, setOpenList] = useState(false);
  const [value, setValue] = useState(sortFilter[2].name);

  return (
    <div className="relative px-2">
      <section
        className={`absolute right-0 top-[-2.7rem] z-40 w-[14rem] cursor-pointer rounded-lg border p-1 text-center`}
        onMouseEnter={() => setOpenList(true)}
        onMouseLeave={() => setOpenList(false)}
      >
        Sort by: {value}
        <ul className="flex flex-col">
          {sortFilter.map((filter, index) => (
            <li key={index} className={openList ? "" : "hidden"}>
              <Link
                href={`/search?q=${q}&sort=${filter.sort}&by=${filter.sortBy}`}
              >
                <div
                  className="w-full bg-background p-2 hover:bg-gray-200"
                  onClick={() => setValue(filter.name)}
                >
                  {filter.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SortFilter;
