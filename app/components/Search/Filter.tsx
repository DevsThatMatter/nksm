import { categories } from "@/constants/categories";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { spartan } from "@/app/utils/fonts";
import { cn } from "@/app/utils";
import { FilterProps } from "@/app/(root)/search/page";

const Filter = ({ query, sorting = "newest", category }: FilterProps) => {
  return (
    <aside className="flex max-h-full flex-col sm:px-2">
      <div className="sticky top-[5.5rem] mt-2 max-h-[calc(100dvh-5.6rem)] overflow-auto pr-1">
        <div className="flex flex-wrap justify-between pb-2">
          <h3 className="text-xl font-bold">Categories</h3>
          <Link
            href={{
              query: {
                q: query,
                sortBy: sorting,
              },
            }}
            replace
            className={`${category ? "block" : "hidden"} text-md pt-1 text-foreground hover:text-cyan-500`}
          >
            Clear
          </Link>
          <Separator className="my-2" />
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
            replace
            key={name}
          >
            <figure className="group relative w-full rounded-lg text-center">
              <Image
                className={cn(
                  " max-h-[15%] w-full object-cover transition-all duration-300 ease-in-out",
                  category === name
                    ? "aspect-video"
                    : "aspect-[7/2] group-hover:aspect-video",
                )}
                src={imgUrl}
                alt={name}
                width={150}
                height={150}
              />
              <figcaption
                className={cn(
                  "transition-opacity] absolute inset-0 flex items-center justify-center bg-white text-center text-lg dark:bg-[#0c0a09]",
                  category === name
                    ? "!bg-opacity-10 text-foreground"
                    : "!bg-opacity-80 text-gray-400 group-hover:!bg-opacity-40",
                )}
              >
                <p
                  className={cn(
                    "text-2xl font-semibold group-hover:text-foreground @2xs:text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @md:font-medium",
                    spartan.className,
                  )}
                >
                  {name}
                </p>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </aside>
  );
};
export default Filter;
