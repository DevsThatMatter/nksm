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
    <CarouselItem className="lg:basis-1/4 basis-1/2 md:basis-1/3 xl:basis-1/5 sm:basis-1/3 min-[200px]:basis-11/12 min-[300px]:basis-1/2">
      <Card className="min-w-[120px] m-1">
        <CardContent className="flex aspect-square items-center justify-center p-3 relative">
          <Link href={""}>
            <div className="flex flex-col justify-center ">
              <Image
                src={image_url}
                alt={name}
                width={400}
                height={400}
                className="rounded shadow-md object-cover aspect-square "
              />
              <div className="flex justify-between items-center mt-2">
                <h1 className="2xl:text-xl lg:text-base sm:text-xl min-[280px]:text-lg font-semibold 2xl:max-w-48 min-[2000px]:max-w-60 lg:max-w-32 md:max-w-40 sm:max-w-44 min-[370px]:max-w-24 min-[300px]:max-w-12 min-[440px]:max-w-52 overflow-ellipsis overflow-hidden hover:underline line-clamp-1">
                  {name}
                </h1>
                <span className="text-gray-500">₹{price}</span>
              </div>
              <p className="lg:text-xs md:text-sm min-[300px]:text-xs text-gray-500 lg:line-clamp-2 overflow-ellipsis min-[240px]:line-clamp-1 min-[300px]:max-w-20 min-[350px]:max-w-28 min-[400px]:max-w-72">
                {description}
              </p>
            </div>
          </Link>
          <div
            className="absolute top-0 right-0 mt-4 mr-4 lg:mt-5 lg:mr-5 sm:mt-6 sm:mr-6 2xl:mt-5 2xl:mr-6 rounded-full bg-gray-200 p-1"
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
