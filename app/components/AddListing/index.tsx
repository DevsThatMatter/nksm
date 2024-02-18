import Link from "next/link";
import { Button } from "../ui/button";

export function AddListing() {
  return (
    <div>
      <Link href="/ListingForm">
        <Button variant="default">Add Listing</Button>
      </Link>
    </div>
  );
}
