import { Button } from "@/components/ui/button";
import { Icons } from "@/app/ui/icons";

export function AddListing() {
    return (
        <Button variant="default" className="relative">
            <Icons.add className="absolute left-2 top-2.5 h-4 w-4" />
            <span className="hidden sm:inline-block pl-4"> Add Listing </span>
        </Button>
    );
}
