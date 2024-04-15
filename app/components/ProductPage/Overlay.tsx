"use client";
import { ReactNode, useState } from "react";

import { cn } from "@/app/utils";

import { Carousel, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";

const Overlay = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={className} onClick={() => setToggle(true)}>
      <Carousel
        className={cn(
          "group peer m-auto w-full transform rounded-lg bg-background shadow-none transition-all aria-expanded:fixed aria-expanded:bottom-0 aria-expanded:left-0 aria-expanded:right-0 aria-expanded:top-0 aria-expanded:z-[51] aria-expanded:max-h-[90vh] aria-expanded:w-[90vw]",
        )}
        aria-expanded={toggle}
      >
        {children}
        <Button
          className="absolute right-2 top-2 hidden h-8 w-8 p-1 group-aria-expanded:flex"
          variant={"outline"}
          onClick={(e) => {
            e.stopPropagation();
            setToggle(false);
          }}
        >
          <Icons.no className="h-4 w-4" />
        </Button>
        <CarouselPrevious className="ml-2 hidden group-aria-expanded:flex" />
        <CarouselNext className="mr-2 hidden group-aria-expanded:flex" />
      </Carousel>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-50 hidden h-[100dvh] w-[100dvw] overflow-hidden bg-background/30 backdrop-blur-sm peer-aria-expanded:block"
        onClick={(e) => {
          e.stopPropagation();
          setToggle(false);
        }}
      />
    </div>
  );
};

export default Overlay;
