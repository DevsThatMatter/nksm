import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface ProductCardProps {
  image_url: string;
  name: string;
  price: number;
  description: string;
}
const ProductCard = ({
  image_url,
  name,
  price,
  description,
}: ProductCardProps) => {
    const [isSaved, setIsSaved] = useState(false)
  return (
    <div className="p-1">
      <Card className="min-w-[120px]">
        <CardContent className="flex aspect-square items-center justify-center p-3 relative">
          <Link href={""}>
            <div className="flex flex-col justify-center">
              <Image
                src={image_url}
                alt={name}
                width={400}
                height={400}
                className="rounded shadow-md object-cover"
              />
              <div className="flex justify-between items-center mt-2 ">
              <h1 className="lg:text-sm sm:text-xl font-semibold max-w-12 line-clamp-1 overflow-ellipsis overflow-hidden hover:underline">{name}</h1>
              <span className="text-gray-500">₹{price}</span>
              </div>
              <p className="text-gray-500 max-w-40 line-clamp-2 overflow-ellipsis">
                {description}
              </p>
            </div>
          </Link>
          <div className="absolute top-0 right-0 mt-5 mr-5 rounded-full bg-gray-200 p-1" onClick={()=>{setIsSaved(!isSaved)}}>
            {!isSaved ? <BookmarkIcon className="w-4 h-4 text-gray-500"/> : <BookmarkFilledIcon className="w-4 h-4 text-gray-500" />}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
