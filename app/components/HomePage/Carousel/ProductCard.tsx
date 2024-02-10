"use client";
import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CarouselItem } from "../../ui/carousel";

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
  const [isSaved, setIsSaved] = useState(false);
  return (
    <CarouselItem className="basis-1/2 min-[200px]:basis-11/12 min-[300px]:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <Card className="m-1 min-w-[120px]">
        <CardContent className="flex relative justify-center items-center p-3 aspect-square">
          <Link href={""}>
            <div className="flex flex-col justify-center">
              <Image
                src={image_url}
                alt={name}
                width={400}
                height={400}
                className="object-cover rounded shadow-md aspect-square"
              />
              <div className="flex justify-between items-center mt-2">
                <h1 className="overflow-hidden font-semibold sm:text-xl lg:text-base 2xl:text-xl hover:underline min-[280px]:text-lg min-[2000px]:max-w-60 min-[370px]:max-w-24 min-[300px]:max-w-12 min-[440px]:max-w-52 overflow-ellipsis line-clamp-1 sm:max-w-44 md:max-w-40 lg:max-w-32 2xl:max-w-48">
                  {name}
                </h1>
                <span className="text-gray-500">₹{price}</span>
              </div>
              <p className="w-full h-8 text-gray-500 break-words md:h-10 md:text-sm lg:h-8 lg:text-xs min-[300px]:text-xs line-clamp-2 overflow-ellipsis">
                {description}
              </p>
            </div>
          </Link>
          <div
            className="absolute top-0 right-0 p-1 mt-4 mr-4 bg-gray-200 rounded-full sm:mt-6 sm:mr-6 lg:mt-5 lg:mr-5 2xl:mt-5 2xl:mr-6"
            onClick={() => {
              setIsSaved(!isSaved);
            }}
          >
            {!isSaved ? (
              <BookmarkIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <BookmarkFilledIcon className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductCard;
