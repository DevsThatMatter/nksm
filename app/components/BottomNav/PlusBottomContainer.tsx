import Link from "next/link";

import { Icons } from "@/app/utils/icons";
import { Button } from "../ui/button";

const PlusBottomContainer = () => {
  return (
    <Link href="/add-listing" className="relative h-full w-12" prefetch>
      <Button className="group mx-auto my-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0 transition duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-purple-500 active:-translate-y-1">
        <Icons.add
          className="h-8 w-8 stroke-white px-1 text-white
                     transition duration-300 group-hover:-translate-y-1"
        />
      </Button>
    </Link>
  );
};
export default PlusBottomContainer;
