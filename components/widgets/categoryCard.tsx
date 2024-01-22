import Link from "next/link";

interface CategoryProp {
  name: string;
  imgUrl: string;
  width?: string;
  height?: string;
  className?: string;
}
const CategoryCard: React.FC<CategoryProp> = ({ name, imgUrl, className }) => {
  return (
    <Link
      href={""}
      key={name}
      className={`${className}  rounded-3xl p-2 md:h-[60vh] sm:h-[30vh] lg:h-auto`}
    >
      <img
        src={imgUrl}
        alt={name}
        className={`rounded-lg object-cover hover:opacity-75`}
        style={{ width: "100%", height: "100%" }}
      />
    </Link>
  );
};

export default CategoryCard;
