import { categories } from "@/constants/categories";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/utils";
import { FilterProps } from "@/app/(root)/search/page";

const Filter = ({ query, sorting = "newest", category }: FilterProps) => {
  return (
    <aside className="my-2 flex max-h-full w-[30%] flex-col sm:w-[20%] sm:p-2">
      <div className="flex flex-wrap justify-between">
        <h3 className="text-xl font-bold">Categories</h3>{" "}
        <Link
          href={{
            query: {
              q: query,
              sortBy: sorting,
            },
          }}
          shallow
          replace
        >
          Clear
        </Link>
      </div>
      {categories.map(({ name, imgUrl }) => (
        <Link
          href={{
            query: {
              q: query,
              sortBy: sorting,
              category: name,
            },
          }}
          shallow
          replace
          key={name}
        >
          <figure className="group relative w-full rounded-sm text-center">
            <Image
              className={cn(
                " max-h-[15%] w-full object-cover ",
                category === name
                  ? "aspect-video"
                  : "aspect-[5/2] group-hover:aspect-video",
              )}
              src={imgUrl}
              alt={name}
              width={150}
              height={150}
            />
            <figcaption
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 text-center text-lg transition-opacity",
                category === name
                  ? "bg-opacity-10"
                  : "bg-opacity-80 group-hover:bg-opacity-40",
              )}
            >
              <p>{name}</p>
            </figcaption>
          </figure>
        </Link>
      ))}
    </aside>
  );
};
export default Filter;
