import { CarouselContent, CarouselItem } from "@/app/components/ui/carousel";
import Image from "next/image";
import Overlay from "./Overlay";

export default function ImageCard({ images }: { images: string[] }) {
  return (
    <div className="relative flex justify-end">
      <div className="absolute bottom-0 left-0 top-0 w-[15%] space-y-2 overflow-auto pr-2">
        {images.map((image: string, index: number) => (
          <Image
            key={index}
            src={image}
            alt={`Image`}
            width={200}
            height={200}
            className="cursor-pointer rounded-md"
          />
        ))}
      </div>

      <Overlay className="aspect-video w-[85%]">
        <CarouselContent className="flex h-full w-full items-center justify-center">
          {images.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1920}
                height={1080}
                className="aspect-video h-full w-full cursor-pointer rounded-lg object-contain py-2"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Overlay>
    </div>
  );
}
