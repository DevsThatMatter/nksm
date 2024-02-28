import Link from "next/link";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";

export function AddListing() {
  return (
    <div>
      <Link href="/ListingForm">
        <Button variant="default" className="relative">
          <Icons.add className="absolute bottom-0 left-2 top-0 m-auto h-5 w-5" />
          <span className="hidden pl-4 sm:inline-block"> Add Listing </span>
        </Button>
      </Link>
    </div>
  );
}
