import { Button } from "@/components/ui/button";
import { Icons } from "@/app/ui/icons";

export function AddListing() {
    return (
        <Button variant="default">
            <Icons.add className="h-[1.3rem] w-[1.3rem]" />
            <span className="hidden sm:inline-block ml-2"> Add Listing </span>
        </Button>
    );
}
