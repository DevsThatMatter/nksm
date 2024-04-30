"use client";
import { FilterProps } from "@/app/(root)/search/page";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { categories } from "@/constants/categories";
import { cn } from "@/app/utils";
import { spartan } from "@/app/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CategoryEnum } from "@/types";
import { SortBy } from "@/types";

export const MobileFilter = ({ query, sorting, category }: FilterProps) => {
  const [filter, setFilter] = useState({
    category: category,
    sorting: sorting,
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="z-40 flex w-full justify-end p-1 lg:hidden">
          {" "}
          <MixerHorizontalIcon className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full grow">
          <DrawerHeader>
            <DrawerDescription className="flex h-fit justify-evenly">
              <div className="">
                <p className="text-xl font-bold">Categories</p>
                {categories.map(({ name, imgUrl }) => (
                  <figure
                    key={name}
                    className="relative w-full rounded-lg text-center"
                    onClick={() =>
                      setFilter({
                        ...filter,
                        category: name as CategoryEnum,
                      })
                    }
                  >
                    <Image
                      className={cn(" aspect-[7/2] w-full object-cover")}
                      src={imgUrl}
                      alt={name}
                      width={150}
                      height={150}
                    />
                    <figcaption
                      className={cn(
                        "absolute inset-0 flex items-center justify-center bg-white text-center text-lg transition-opacity dark:bg-[#0c0a09]",
                        filter.category === name
                          ? "!bg-opacity-10 text-foreground"
                          : "!bg-opacity-80 text-gray-400",
                      )}
                    >
                      <p
                        className={cn(
                          "text-xl font-semibold @2xs:text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @md:font-medium",
                          spartan.className,
                        )}
                      >
                        {name}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="space-y-5 text-foreground">
                <p className="text-xl font-bold">Sort by</p>
                <RadioGroup
                  defaultValue={sorting}
                  className="space-y-5"
                  onValueChange={(value: SortBy) => {
                    setFilter({
                      ...filter,
                      sorting: value,
                    });
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="newest" />
                    <Label htmlFor="newest">Date: Newest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oldest" id="oldest" />
                    <Label htmlFor="oldest">Date: Oldest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">Price: High to Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Price: Low to High</Label>
                  </div>
                </RadioGroup>
              </div>
            </DrawerDescription>
          </DrawerHeader>
        </div>
        <DrawerFooter>
          <div className="flex justify-end gap-3">
            <DrawerClose asChild>
              <Link
                href={{
                  query: {
                    q: query,
                  },
                }}
              >
                <Button
                  className="bg-red-400"
                  onClick={() =>
                    setFilter({
                      category: undefined,
                      sorting: undefined,
                    })
                  }
                >
                  Clear
                </Button>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={{
                  query: {
                    q: query,
                    sortBy: filter.sorting,
                    category: filter.category,
                  },
                }}
              >
                <Button className="">Apply</Button>
              </Link>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
