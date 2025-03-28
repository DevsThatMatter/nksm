import { Category } from "@/types";

import CategoryCard from "./categoryCard";

export const categories: Category[] = [
  {
    name: "Bicycles",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FBicycle.png",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkBicycle.png",
    classNames: {
      root: "lg:row-span-2",
      text: "top-[20%] right-0 left-0 mx-auto",
    },
  },
  {
    name: "Coolers",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FCooler.png",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkCooler.png",
    classNames: {
      image: "object-left-top",
      root: "lg:col-span-2 lg:row-span-3",
      text: "top-[20%] left-[15%] dark:top-[20%] dark:right-0 dark:left-0 dark:m-auto",
    },
  },
  {
    name: "Stationery",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FStationery.jpg",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkStationery.jpg",
    classNames: {
      text: "pl-3 right-0 left-0 mx-auto top-[25%] xl:top-[20%]",
    },
  },
  {
    name: "Miscellaneous",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FMiscellaneous.jpg",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkMiscellaneous.jpg",
    classNames: {
      root: "lg:row-span-2",
      text: "top-[10%] left-[5%] @md:top-[15%]",
    },
  },
  {
    name: "Mattresses",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FMattress.png",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkMattress.png",
    classNames: {
      root: "lg:row-span-2",
      text: "dark:top-[20%] dark:right-0 dark:left-0 dark:mx-auto dark:my-0 top-0 left-0 right-0 bottom-0 m-auto",
    },
  },
  {
    name: "Kitchenware",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FKitchenware.png",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkKitchenware.png",
    classNames: {
      image: "object-right-top",
      text: "top-[20%] sm:right-[20%] right-[5%]",
    },
  },
  {
    name: "Instruments",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FInstruments.jpg",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkInstruments.jpg",
    classNames: {
      text: "top-[15%] left-[10%]",
    },
  },
  {
    name: "Electronics",
    imgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/Categories%2FElectronics.png",
    darkImgUrl:
      "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/DarkCategories%2FDarkElectronics.png",
    classNames: {
      text: "top-[15%] left-[10%]",
    },
  },
];

const Categories = () => {
  return (
    <div className="m-2 grid grid-cols-2 gap-4 pt-2 md:px-3 lg:aspect-video lg:grid-cols-category lg:grid-rows-category">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          imgUrl={category.imgUrl}
          darkImgUrl={category.darkImgUrl}
          classNames={category.classNames}
        />
      ))}
    </div>
  );
};
export default Categories;
