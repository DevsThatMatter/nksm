import * as React from "react";

import { Card } from "@/app/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function ImageCard({ images }: any) {
  return (
    <div className="relative flex justify-end">
      <div className="absolute bottom-0 left-0 top-0 w-[15%] space-y-2 overflow-auto pr-2">
        {images.map((image: string, index: number) => (
          <Link
            key={index}
            href={{
              pathname: `/product/preview/${index}`,
              query: { imageLink: image },
            }}
          >
            <Image
              src={image}
              alt={`Image`}
              width={200}
              height={200}
              className="cursor-pointer rounded-md"
            />
          </Link>
        ))}
      </div>

      <Carousel className="w-[85%] rounded-lg shadow-none">
        <CarouselContent>
          {images.map((image: string, index: number) => (
            <CarouselItem key={index} className="rounded-md ">
              <Link
                href={{
                  pathname: `/product/preview/${index}`,
                  query: { imageLink: image },
                }}
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="aspect-video h-full w-full cursor-pointer rounded-lg object-fill"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
