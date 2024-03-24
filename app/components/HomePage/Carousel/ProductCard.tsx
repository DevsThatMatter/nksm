import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { CarouselItem } from "../../ui/carousel";
import { ObjectId } from "mongoose";
import ProductSaved from "../../ProductSaved";

interface ProductCardProps {
  id: ObjectId;
  image_url: string;
  name: string;
  price: number;
  description: string;
}
const ProductCard = ({
  id,
  image_url,
  name,
  price,
  description,
}: ProductCardProps) => {
  return (
    <CarouselItem className="basis-1/2 min-[200px]:basis-11/12 min-[300px]:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <Card className="m-1 min-w-[120px]">
        <CardContent className="relative flex aspect-square items-center justify-center p-3">
          <Link href={""}>
            <div className="flex flex-col justify-center">
              <Image
                src={image_url}
                alt={name}
                width={400}
                height={400}
                className="aspect-square rounded object-cover shadow-md"
              />
              <div className="mt-2 flex items-center justify-between">
                <h1 className="line-clamp-1 overflow-hidden overflow-ellipsis font-semibold hover:underline min-[280px]:text-lg min-[300px]:max-w-12 min-[370px]:max-w-24 min-[440px]:max-w-52 sm:max-w-44 sm:text-xl md:max-w-40 lg:max-w-32 lg:text-base 2xl:max-w-48 2xl:text-xl min-[2000px]:max-w-60">
                  {name}
                </h1>
                <span className="text-gray-500">₹{price}</span>
              </div>
              <p className="line-clamp-2 h-8 w-full overflow-ellipsis break-words text-gray-500 min-[300px]:max-w-28 min-[300px]:text-xs min-[430px]:max-w-40 md:h-10 md:max-w-48 md:text-sm lg:h-8 lg:text-xs 2xl:max-w-60">
                {description}
              </p>
            </div>
          </Link>
          <ProductSaved
            className="absolute right-0 top-0 mr-4 mt-4 rounded-full bg-gray-200 p-1 sm:mr-6 sm:mt-6 lg:mr-5 lg:mt-5 2xl:mr-6 2xl:mt-5"
            id={id.toString()}
          />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductCard;
