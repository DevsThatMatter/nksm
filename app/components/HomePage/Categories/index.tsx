import CategoryCard from "./categoryCard";
import { categories } from "@/constants/categories";
//import { className } from "postcss-selector-parser";

const Categories = () => {
  return (
    //<div className="hidden left-[5%] @md:top-[15%] left-[20%] sm:right-[20%] right-[5%] pl-3 @sm:text-[2.6rem] left-[15%] @md:text-[2.6rem] top-[25%] xl:top-[20%] top-[30%] right-[20%] object-top  top-[20%] top-[10%] left-[10%] top-[15%] top-[20%] right-1/4 inset-0 m-auto right-0 left-0 mx-auto left-1/4 lg:row-span-2 lg:col-span-2 lg:row-span-3  lg:row-span-2 lg:row-span-2 object-right-top object-left-top inset-0"></div>

    <div className=" m-2 grid grid-cols-2 gap-4 pt-2 md:px-3 lg:h-[102vh] lg:grid-cols-category lg:grid-rows-category">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          imgUrl={category.imgUrl}
          darkImgUrl={category.darkImgUrl}
          imageClassName={category.imageClassName}
          className={category.className}
          textClassName={category.textClassName}
        />
      ))}
    </div>
  );
};
export default Categories;
