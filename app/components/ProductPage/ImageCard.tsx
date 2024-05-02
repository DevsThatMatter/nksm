import {
  Carousel,
  CarouselContent,
  CarouselIndexNavigate,
  CarouselItem,
} from "@/app/components/ui/carousel";
import Image from "next/image";
import Overlay from "./Overlay";
import { EmblaOptionsType } from "embla-carousel";
import { array } from "zod";
import { Skeleton } from "../ui/skeleton";

export function ImageCardSkeleton() {
  return (
    <div>
      <div className="relative flex justify-end">
        <div className="absolute bottom-0 left-0 top-0 w-[15%] space-y-2 overflow-auto rounded-md pr-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-md" />
          ))}
        </div>
        <Skeleton className="aspect-video w-[85%] rounded-lg border border-muted"></Skeleton>
      </div>
    </div>
  );
}

export default function ImageCard({ images }: { images: string[] }) {
  const options: EmblaOptionsType = {
    skipSnaps: true,
  };
  return (
    <Carousel removedContainer opts={options}>
      <div className="relative flex justify-end">
        <div className="absolute bottom-0 left-0 top-0 w-[15%] space-y-2 overflow-auto pr-2">
          {images.map((image: string, index: number) => (
            <CarouselIndexNavigate index={index} key={index}>
              <Image
                src={image}
                alt={`Image`}
                width={200}
                height={200}
                className="cursor-pointer rounded-md"
              />
            </CarouselIndexNavigate>
          ))}
        </div>

        <Overlay className="aspect-video w-[85%] rounded-lg border border-muted bg-muted">
          <CarouselContent className="h-full w-full bg-muted">
            {images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="aspect-video h-full w-full cursor-pointer bg-muted object-contain pl-3"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Overlay>
      </div>
    </Carousel>
  );
}
