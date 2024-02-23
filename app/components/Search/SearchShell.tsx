"use client";

import { Icons } from "@/app/utils/icons";
import * as Switch from "@radix-ui/react-switch";
import { ReactNode, useState } from "react";

const SearchShell = ({ children }: { children: ReactNode }) => {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <div
      className={`relative px-2 ${isGrid ? "grid md:grid-cols-3 sm:grid-cols-2" : ""}`}
    >
      <Switch.Root
        className="absolute right-3 top-[-2.7rem] SwitchRoot w-16 h-8 rounded-md border hidden sm:flex"
        onClick={() => setIsGrid(!isGrid)}
        defaultChecked={!isGrid}
      >
        <Switch.Thumb className="SwitchThumb w-7 h-6 mx-[0.2rem] my-[0.18rem] bg-muted absolute rounded-md transition-transform duration-100 border" />
        <Icons.grid className="w-6 my-auto mx-1 px-1 z-10" />
        <Icons.list className="w-7 h-5 my-auto z-10" />
      </Switch.Root>
      {children}
    </div>
  );
};
export default SearchShell;
