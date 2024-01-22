import Link from "next/link";
import Image from "next/image";
interface CategoryProp {
  name: string;
  imgUrl: string;
  className?: string;
}
const CategoryCard: React.FC<CategoryProp> = ({ name, imgUrl, className }) => {
  return (
    <Link
      href={""}
      key={name}
      className={`${className}  rounded-3xl p-2 md:h-[60vh] sm:h-[30vh] lg:h-auto`}
    >
      <Image
        src={imgUrl}
        alt={name}
        className={`rounded-lg object-cover hover:opacity-75 h-full w-full`}
        width={800}
        height={800}
      />
    </Link>
  );
};

export default CategoryCard;
