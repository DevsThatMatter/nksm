"use client";

import { Icons } from "@/app/utils/icons";
import * as Switch from "@radix-ui/react-switch";
import { ReactNode, useState } from "react";

const SearchShell = ({ children }: { children: ReactNode }) => {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <div
      className={`relative px-2 ${isGrid ? "grid sm:grid-cols-2 md:grid-cols-3" : ""}`}
    >
      <Switch.Root
        className="SwitchRoot absolute right-3 top-[-2.7rem] hidden h-8 w-16 rounded-md border sm:flex"
        onClick={() => setIsGrid(!isGrid)}
        defaultChecked={!isGrid}
      >
        <Switch.Thumb className="SwitchThumb absolute mx-[0.2rem] my-[0.18rem] h-6 w-7 rounded-md border bg-muted transition-transform duration-100" />
        <Icons.grid className="z-10 mx-1 my-auto w-6 px-1" />
        <Icons.list className="z-10 my-auto h-5 w-7" />
      </Switch.Root>
      {children}
    </div>
  );
};
export default SearchShell;
