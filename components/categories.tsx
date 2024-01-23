"use client";
import CategoryCard from "./widgets/categoryCard";
import { categories } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { spartan } from "@/app/ui/fonts";

const Categories = () => {
  return (
    //<div className="hidden left-[20%] sm:right-[20%] pl-3 @sm:text-[2.6rem] left-[15%] @md:text-[2.6rem] top-[25%] xl:top-[20%] top-[30%] right-[20%] object-top  top-[20%] top-[10%] left-[10%] top-[15%] top-[20%] right-1/4 inset-0 m-auto right-0 left-0 mx-auto left-1/4 lg:row-span-2 lg:col-span-2 lg:row-span-3  lg:row-span-2 lg:row-span-2 object-right-top object-left-top inset-0"></div>

    <div className="grid lg:grid-cols-category grid-cols-2 lg:grid-rows-category md:px-3 lg:h-[102vh]">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          imgUrl={category.imgUrl}
          imageClassName={cn(
            "rounded-lg object-cover hover:opacity-75 h-full w-full ",
            category.imageClassName,
          )}
          className={cn(
            "@container relative rounded-3xl p-2 sm:h-[30vh] md:h-[60vh] lg:h-auto overflow-hidden",
            category.className,
          )}
          textClassName={cn(
            "absolute w-fit h-fit text-2xl @2xs:text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl font-semibold @md:font-medium text-gray-700",
            category.textClassName,
            spartan.className,
          )}
        />
      ))}
    </div>
  );
};
export default Categories;
