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

const frameworks = [
  { label: "Bicycles" },
  { label: "Coolers" },
  { label: "Stationery" },
  { label: "Miscellaneous" },
  { label: "Mattresses" },
  { label: "Kitchenware" },
  { label: "Instruments" },
  { label: "Electronics" },
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
    <div className="my-2 w-[20%] text-center">
      <h1 className="font-bold">Browse by Category</h1>
      <section className="flex justify-center p-2">
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
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No such Category.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.label}
                    value={framework.label.toLowerCase()}
                    onSelect={(currentValue) => {
                      const label = frameworks.find(
                        (framework) =>
                          framework.label.toLowerCase() === currentValue,
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
          title="Clear Category"
          className=""
          onClick={() => router.push(`?q=${q}&sort=${sort}&by=${sortBy}`)}
          variant={"ghost"}
        >
          <Cross1Icon />
        </Button>
      </section>
    </div>
  );
};
export default Filter;
