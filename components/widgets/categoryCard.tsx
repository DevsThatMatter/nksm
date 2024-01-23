import Link from "next/link";
import Image from "next/image";
import { spartan } from "@/app/ui/fonts";
interface CategoryProp {
  name: string;
  imgUrl: string;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}
const CategoryCard: React.FC<CategoryProp> = ({
  name,
  imgUrl,
  className,
  imageClassName,
  textClassName,
}) => {
  return (
    <Link
      href={""}
      key={name}
      className={`@container relative ${className}  rounded-3xl p-2 sm:h-[30vh] md:h-[60vh] lg:h-auto overflow-hidden `}
    >
      <Image
        src={imgUrl}
        alt={name}
        className={` rounded-lg object-cover hover:opacity-75 h-full w-full ${imageClassName}`}
        width={800}
        height={800}
      />

      <h1
        className={`absolute w-fit h-fit text-2xl @2xs:text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl font-semibold @md:font-medium text-gray-700   ${textClassName} ${spartan.className}`}
      >
        {name}
      </h1>
    </Link>
  );
};

export default CategoryCard;
