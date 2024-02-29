import { Icons } from "@/app/utils/icons";
import { AddListing } from "../AddListing";
import { Button } from "../ui/button";
import Link from "next/link";

const PlusBottomContainer = () => {
  console.log("PlusBottomContainer");
  return (
    <div className="relative h-full w-12">
      <AddListing>
        <Link href="/add-listing">
        <Button className="rounded-full p-0 my-1 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:-translate-y-1 duration-300 active:-translate-y-1 transition flex justify-center items-center group mx-auto">
          <Icons.add
            className="transition duration-300 text-white group-hover:-translate-y-1 stroke-white
                     w-8 h-8 px-1"
          />
        </Button>
        </Link>
      </AddListing>
    </div>
  );
};
export default PlusBottomContainer;
