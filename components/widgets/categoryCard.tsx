import Link from "next/link";
import Image from "next/image";
import { spartan } from "@/app/ui/fonts";
import { cn } from "@/lib/utils";
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
    <Link href={""} key={name} className={className}>
      <Image
        src={imgUrl}
        alt={name}
        className={imageClassName}
        width={800}
        height={800}
      />

      <h1 className={textClassName}>{name}</h1>
    </Link>
  );
};

export default CategoryCard;
