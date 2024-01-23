"use client";
import CategoryCard from "./widgets/categoryCard";
import { categories } from "@/constants/categories";

const Categories = () => {
  return (
    <div className="grid lg:grid-cols-category grid-cols-2 lg:grid-rows-category md:px-3 lg:h-[102vh]">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          imgUrl={category.imgUrl}
          imageClassName={category.imageClassName}
          className={category.className}
          textClassName={category.textClassName}
        />
      ))}
    </div>
  );
};
export default Categories;
