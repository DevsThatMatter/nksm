import Link from "next/link";

interface CategoryProp {
    name: string,
    imgUrl: string,
    width?: string,
    height: string
}
const CategoryCard: React.FC<CategoryProp> = ({name, imgUrl, width, height}) => {
  return (
    <Link href={""} key={name} className="lg:w-[50%]">
      <div className="flex justify-center rounded-3xl p-2" >
        <img
          src={imgUrl}
          alt={name}
          className={`rounded-lg object-cover hover:opacity-75`}
          style={{ width: "100%", height: height }}
        />
      </div>
    </Link>
  );
};

export default CategoryCard;