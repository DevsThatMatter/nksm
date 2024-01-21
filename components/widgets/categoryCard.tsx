import Link from "next/link";

interface CategoryProp {
    name: string,
    imgUrl: string,
    width: string,
    height: string
}
const CategoryCard: React.FC<CategoryProp> = ({name, imgUrl, width, height}) => {
  return (
    <Link href={""} key={name}>
      <div className="flex justify-center rounded-3xl p-4" >
        <img
          src={imgUrl}
          alt={name}
          className={`rounded-lg object-fill hover:opacity-75`}
          style={{ width: width, height: height }}
        />
      </div>
    </Link>
  );
};

export default CategoryCard;