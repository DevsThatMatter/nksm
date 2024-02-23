"use client";

import * as React from "react";
import { CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "@/app/utils";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "../ui/switch";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import Link from "next/link";

const frameworks = [
  { label: "Bicycles", value: "bicycles" },
  { label: "Coolers", value: "coolers" },
  { label: "Stationery", value: "stationery" },
  { label: "Miscellaneous", value: "miscellaneous" },
  { label: "Mattresses", value: "mattresses" },
  { label: "Kitchenware", value: "kitchenware" },
  { label: "Instruments", value: "instruments" },
  { label: "Electronics", value: "electronics" },
];
const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const value = searchParams!.get("category") || "";
  const sort = Number(searchParams!.get("sort")) || -1;
  const q = searchParams!.get("q") || "";
  const sortBy = searchParams!.get("by") || "createdAt";

  return (
    <div className="my-2 w-[48rem]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? value : "Select Category..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No such Category.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.label}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const label = frameworks.find(
                      (framework) => framework.value === currentValue,
                    )?.label;
                    if (!label) return;
                    router.push(
                      `?q=${q}&category=${label}&sort=${sort}&by=${sortBy}`,
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.label ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="mt-2 h-8 w-8 p-0"
        onClick={() => router.push(`?q=${q}&sort=${sort}&by=${sortBy}`)}
        variant={"ghost"}
      >
        <Cross1Icon />
      </Button>
      <Switch
        onClick={() => {
          router.push(
            `?q=${q}&category=${value}&sort=${-1 * sort}&by=${sortBy}`,
          );
          console.log("Switch Clicked");
        }}
      />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={`?q=${q}&category=${value}&sort=${sort}&by=createdAt`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Created
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={`?q=${q}&category=${value}&sort=${sort}&by=Price`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Price
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
export default Filter;
