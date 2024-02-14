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

export default function ImageCard({ images }: any) {
  return (
    <div className="grid grid-cols-6 gap-4 max-h-[25rem]">
      <div className="grid col-span-1 max-h-[20px] gap-2">
        {images.map((image: string, index: number) => (
          <Image
            key={index}
            src={image}
            alt={`Image `}
            width={80}
            height={80}
            className="object-cover rounded-md w-auto h-auto"
          />
        ))}
      </div>
      <div className="col-span-5">
        <Carousel className="w-full shadow-none rounded-lg">
          <CarouselContent>
            {images.map((image: string, index: number) => (
              <CarouselItem key={index} className="rounded-md">
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={800}
                  height={600}
                  className="object-cover rounded-lg aspect-video w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
