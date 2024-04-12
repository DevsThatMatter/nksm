"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { spartan } from "@/app/utils/fonts";
import { cn } from "@/app/utils";
interface CategoryProp {
  name: string;
  imgUrl: string;
  darkImgUrl: string;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}
const CategoryCard: React.FC<CategoryProp> = ({
  name,
  imgUrl,
  darkImgUrl,
  className,
  imageClassName,
  textClassName,
}) => {
  const { theme } = useTheme();
  return (
    <Link
      href={""}
      key={name}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-lg @container sm:aspect-auto sm:h-[30vh] md:h-[60vh] lg:h-auto",
        className,
      )}
    >
      <Image
        src={theme === "light" ? imgUrl : darkImgUrl}
        alt={name}
        className={cn(
          "h-full w-full rounded-lg object-cover group-hover:opacity-75 ",
          imageClassName,
        )}
        width={800}
        height={800}
      />

      <h1
        className={cn(
          "absolute h-fit w-fit text-2xl font-semibold text-foreground/70 group-hover:opacity-75 @2xs:text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @md:font-medium dark:text-foreground",
          // theme === "light" ? textClassName : darkTextClassName,
          textClassName,
          spartan.className,
        )}
      >
        {name}
      </h1>
    </Link>
  );
};

export default CategoryCard;
