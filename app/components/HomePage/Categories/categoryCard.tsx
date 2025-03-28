import { cn } from "@/app/utils";
import { spartan } from "@/app/utils/fonts";
import Image from "next/image";
import Link from "next/link";
interface CategoryProp {
  name: string;
  imgUrl: string;
  darkImgUrl: string;
  classNames?: { root?: string; image?: string; text?: string };
}
const CategoryCard: React.FC<CategoryProp> = ({
  name,
  imgUrl,
  darkImgUrl,
  classNames,
}) => {
  return (
    <Link
      href={{
        pathname: "/search",
        query: {
          q: "",
          category: name,
        },
      }}
      key={name}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-lg @container sm:aspect-auto sm:h-[30vh] md:h-[60vh] lg:h-auto",
        classNames?.root,
      )}
    >
      <Image
        src={imgUrl}
        alt={name}
        className={cn(
          "h-full w-full rounded-lg object-cover group-hover:opacity-75 dark:hidden",
          classNames?.image,
        )}
        width={800}
        height={800}
      />
      <Image
        src={darkImgUrl}
        alt={name}
        className={cn(
          "hidden h-full w-full rounded-lg object-cover group-hover:opacity-75 dark:block",
          classNames?.image,
        )}
        width={800}
        height={800}
      />

      <h1
        className={cn(
          "absolute h-fit w-fit text-2xl font-semibold text-foreground/70 group-hover:opacity-75 @2xs:text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @md:font-medium dark:text-foreground",
          // theme === "light" ? textClassName : darkTextClassName,
          classNames?.text,
          spartan.className,
        )}
      >
        {name}
      </h1>
    </Link>
  );
};

export default CategoryCard;
