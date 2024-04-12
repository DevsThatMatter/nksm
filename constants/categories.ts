import { category } from "@/types";
export const categories: category[] = [
  {
    name: "Bicycles",
    imgUrl: "/Categories/Bicycle.png",
    darkImgUrl: "/DarkCategories/DarkBicycle.png",
    className: "lg:row-span-2",
    textClassName: "dark:text-foreground top-[20%] right-0 left-0 mx-auto",
  },
  {
    name: "Coolers",
    imgUrl: "/Categories/Cooler.png",
    darkImgUrl: "/DarkCategories/DarkCooler.png",
    imageClassName: "object-left-top",
    className: "lg:col-span-2 lg:row-span-3",
    textClassName: "dark:text-foreground top-[20%] left-[15%]",
  },
  {
    name: "Stationery",
    imgUrl: "/Categories/Stationery.jpg",
    darkImgUrl: "/DarkCategories/DarkStationery.png",
    textClassName:
      "dark:text-foreground top-[20%]  pl-3 right-0 left-0 mx-auto top-[25%] xl:top-[20%]",
  },
  {
    name: "Miscellaneous",
    imgUrl: "/Categories/Miscellaneous.jpg",
    darkImgUrl: "/DarkCategories/DarkMiscellaneous.png",
    className: "lg:row-span-2",
    textClassName: "dark:text-foreground top-[10%] left-[5%] @md:top-[15%]",
  },

  {
    name: "Mattresses",
    imgUrl: "/Categories/Mattress.png",
    darkImgUrl: "/DarkCategories/DarkMattress.png",
    className: "lg:row-span-2",
    textClassName: "dark:text-foreground inset-0 m-auto",
  },
  {
    name: "Kitchenware",
    imgUrl: "/Categories/Kettle.png",
    darkImgUrl: "/DarkCategories/DarkKitchenware.png",
    imageClassName: "object-right-top",
    textClassName: "dark:text-foreground top-[20%] sm:right-[20%] right-[5%]",
  },
  {
    name: "Instruments",
    imgUrl: "/Categories/Instruments.jpg",
    darkImgUrl: "/DarkCategories/DarkInstruments.png",
    textClassName: "dark:text-foreground top-[15%] left-[10%]",
  },
  {
    name: "Electronics",
    imgUrl: "/Categories/Electronics.png",
    darkImgUrl: "/DarkCategories/DarkElectronics.png",
    textClassName: "dark:text-foreground top-[15%] left-[10%]",
  },
];
