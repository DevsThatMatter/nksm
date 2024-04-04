import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { CarouselItem } from "../../ui/carousel";
import { Types } from "mongoose";
import ProductSaved from "../../ProductSaved";

interface ProductCardProps {
  id: Types.ObjectId;
  image_url: string;
  name: string;
  price: number;
  description: string;
  productPageCarousel?: boolean;
}
const ProductCard = ({
  id,
  image_url,
  name,
  price,
  description,
  productPageCarousel = false,
}: ProductCardProps) => {
  return (
    <CarouselItem
      className={
        productPageCarousel
          ? "basis-1/2 min-[200px]:basis-11/12 min-[300px]:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4"
          : "basis-1/2 min-[200px]:basis-11/12 min-[300px]:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
      }
    >
      <Card className="m-1 min-w-[120px]">
        <CardContent className="relative flex aspect-square items-center justify-center p-3">
          <Link href={`/product/${id}`}>
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
                <span className="text-muted-foreground">₹{price}</span>
              </div>
              <p className="line-clamp-2 h-8 w-full overflow-ellipsis break-words text-foreground min-[300px]:text-xs md:h-10 md:text-sm lg:h-8 lg:text-xs">
                {description}
              </p>
            </div>
          </Link>
          <ProductSaved
            className="absolute right-0 top-0 mr-4 mt-4 rounded-full bg-gray-200 p-1 hover:cursor-pointer sm:mr-6 sm:mt-6 lg:mr-5 lg:mt-5 2xl:mr-6 2xl:mt-5"
            id={id.toString()}
          />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductCard;
