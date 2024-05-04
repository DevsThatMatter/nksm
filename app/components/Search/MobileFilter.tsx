"use server";
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
import { CategoryEnum, SortBy } from "@/types";
import { redirect } from "next/navigation";
import Link from "next/link";

export const MobileFilter = ({ query, sorting, category }: FilterProps) => {
  const handleSubmit = (formData: FormData) => {
    "use server";
    const sortBy = formData.get("sorting") as SortBy;
    const category = formData.get("category") as CategoryEnum;
    const searchParams = new URLSearchParams();
    if (sortBy) searchParams.set("sortBy", sortBy);
    if (category) searchParams.set("category", category);
    const url = `/search?q=${query}&${searchParams.toString()}`;
    redirect(url);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="z-40 flex w-full justify-end p-1 lg:hidden">
          <MixerHorizontalIcon className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <form className="mx-auto w-full" action={handleSubmit}>
          <DrawerHeader>
            <DrawerDescription className="flex h-fit grow justify-evenly">
              <section className="flex flex-col overflow-y-auto">
                <p className="pb-1 text-center text-xl font-bold text-foreground">
                  Categories
                </p>
                {categories.map(({ name, imgUrl }) => (
                  <fieldset key={name}>
                    <input
                      type="radio"
                      name="category"
                      value={name}
                      defaultChecked={category === name}
                      id={name}
                      className="peer hidden appearance-none"
                    />
                    <label
                      htmlFor={name}
                      className="group flex items-center space-x-2 peer-checked:[&_figcaption]:!bg-opacity-10 peer-checked:[&_figcaption]:text-foreground peer-checked:[&_img]:aspect-video"
                    >
                      <figure
                        key={name}
                        className="relative w-full rounded-lg text-center"
                      >
                        <Image
                          className={cn(
                            "aspect-[7/2] w-full object-cover transition-all duration-300 ease-in-out",
                          )}
                          src={imgUrl}
                          alt={name}
                          width={150}
                          height={150}
                        />
                        <figcaption
                          className={cn(
                            "absolute inset-0 flex items-center justify-center bg-white !bg-opacity-80 text-center text-lg text-gray-400 transition-opacity dark:bg-[#0c0a09]",
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
                    </label>
                  </fieldset>
                ))}
              </section>

              <section className="space-y-5 text-foreground">
                <p className="text-center text-xl font-bold">Sort by</p>
                <RadioGroup
                  defaultValue={sorting}
                  className="space-y-5"
                  name="sorting"
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
              </section>
            </DrawerDescription>
          </DrawerHeader>
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
                  <Button variant="outline">Clear</Button>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Button type="submit">Apply</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
