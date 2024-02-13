"use client";
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
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="grid grid-cols-6 gap-4 max-h-[400px]">
      <div className="col-span-1 max-h-[20px]">
        {images.map((image: string) => (
          <Image
            src={image}
            alt={`Image `}
            width={80}
            height={80}
            className="object-cover rounded-md shadow-md w-auto h-auto my-1"
          />
        ))}
      </div>
      <div className="col-span-5">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image: string, index: number) => (
              <CarouselItem key={index} className="rounded-md">
                <Card className="max-w-[800px] max-h-[400px]">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={800}
                    height={400}
                    className="object-cover rounded-xl shadow-md aspect-video"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="py-2 flex justify-center items-center">
          {images.map((_: any, index: number) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                current === index+1  ? "bg-gray-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
