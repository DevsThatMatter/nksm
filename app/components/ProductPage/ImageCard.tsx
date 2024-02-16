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
    <div className="flex justify-end relative">
      <div className="w-[15%] absolute left-0 top-0 bottom-0 overflow-auto space-y-2 pr-2">
        {images.map((image: string, index: number) => (
          <Image
            key={index}
            src={image}
            alt={`Image`}
            width={200}
            height={200}
            className="rounded-md"
            
          />
        ))}
      </div>

      <Carousel className="w-[85%] shadow-none rounded-lg">
        <CarouselContent>
          {images.map((image: string, index: number) => (
            <CarouselItem key={index} className="rounded-md">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1920}
                height={1080}
                className="object-cover rounded-lg aspect-video w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
