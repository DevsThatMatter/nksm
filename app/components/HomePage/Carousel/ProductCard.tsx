import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { CarouselItem } from "../../ui/carousel";
import { ObjectId } from "mongoose";
import ProductSaved from "../../ProductSaved";
import { ConditionEnum } from "@/types";
import { cn } from "@/app/utils";

interface ProductCardProps {
  id: ObjectId | string;
  image_url: string;
  name: string;
  price: number;
  description: string;
  productPageCarousel?: boolean;
  condition: keyof typeof ConditionEnum;
  negotiable: boolean;
}
const ProductCard = async ({
  id,
  image_url,
  name,
  price,
  description,
  condition,
  negotiable,
  productPageCarousel = false,
}: ProductCardProps) => {
  const product = {
    _id: id.toString(),
    Image: image_url,
    Condition: condition,
    Price: price,
    Negotiable: negotiable,
    Product_Name: name,
  };
  const adaptedPrice = price > 1000 ? Math.floor(price / 1000) + "k" : price;

  return (
    <CarouselItem
      className={cn(
        "sm:basis-1/3",
        productPageCarousel
          ? "basis-11/12 min-[305px]:basis-9/12 min-[450px]:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          : "basis-9/12 min-[425px]:basis-1/2 lg:basis-1/4 xl:basis-1/5",
      )}
    >
      <Card className="m-1">
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
                <span className="grow overflow-hidden">
                  <h1 className="line-clamp-1 overflow-hidden overflow-ellipsis text-lg font-semibold hover:underline">
                    {name}
                  </h1>
                </span>
                <span className="text-muted-foreground">₹{adaptedPrice}</span>
              </div>
              <p className="line-clamp-2 h-8 w-full overflow-ellipsis break-all text-foreground min-[300px]:text-xs md:h-10 md:text-sm lg:h-8 lg:text-xs">
                {description}
              </p>
            </div>
          </Link>
          <ProductSaved
            className="absolute right-0 top-0 mr-4 mt-4 rounded-full bg-gray-200 p-1 hover:cursor-pointer sm:mr-6 sm:mt-6 lg:mr-5 lg:mt-5 2xl:mr-6 2xl:mt-5"
            product={product}
          />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductCard;
