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
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <Image
          src={images[1]}
          alt={`Image `}
          width={600}
          height={400}
          className="object-cover rounded shadow-md w-full"
        />
      </div>
      <div className="col-span-3">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <Card className="max-w-[600px] max-h-auto">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={600}
                    height={300}
                    className="object-fill rounded shadow-md"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {images.length}
        </div>
      </div>
    </div>
  );
}
