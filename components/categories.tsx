"use client";
import CategoryCard from "./widgets/categoryCard";

const Categories = () => {
  const categories = [
    {
      name: "Category 1",
      imgUrl: "/categoriesImages/Bicycle.png",
    },
    {
      name: "Category 2",
      imgUrl: "/categoriesImages/Mattress.png",
    },
    {
      name: "Category 3",
      imgUrl: "/categoriesImages/Cooler.png",
    },
    {
      name: "Category 4",
      imgUrl: "/categoriesImages/Kettle.png",
    },
    {
      name: "Category 5",
      imgUrl: "/categoriesImages/Luggage Bags.png",
    },
    {
      name: "Category 6",
      imgUrl: "/categoriesImages/Stationery.png",
    },
    {
      name: "Category 7",
      imgUrl: "/categoriesImages/Decoratives.png",
    },
    {
      name: "Category 8",
      imgUrl: "/categoriesImages/Electronics.png",
    },
  ];

  return (
    <div className="grid lg:grid-cols-category grid-cols-2 lg:grid-rows-category md:px-3 lg:h-[102vh]">
      <CategoryCard
        key={categories[0].name}
        name={categories[0].name}
        imgUrl={categories[0].imgUrl}
        className="lg:row-span-2"
      />
      <CategoryCard
        key={categories[1].name}
        name={categories[1].name}
        imgUrl={categories[1].imgUrl}
        className="lg:col-span-2 lg:row-span-3"
      />
      <CategoryCard
        key={categories[2].name}
        name={categories[2].name}
        imgUrl={categories[2].imgUrl}
      />
      <CategoryCard
        key={categories[3].name}
        name={categories[3].name}
        imgUrl={categories[3].imgUrl}
        className="lg:row-span-2"
      />
      <CategoryCard
        key={categories[4].name}
        name={categories[4].name}
        imgUrl={categories[4].imgUrl}
        className="lg:row-span-2"
      />
      <CategoryCard
        key={categories[5].name}
        name={categories[5].name}
        imgUrl={categories[5].imgUrl}
      />
      <CategoryCard
        key={categories[6].name}
        name={categories[6].name}
        imgUrl={categories[6].imgUrl}
      />
      <CategoryCard
        key={categories[7].name}
        name={categories[7].name}
        imgUrl={categories[7].imgUrl}
      />
    </div>
  );
};
export default Categories;
