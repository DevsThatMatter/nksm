import { Button } from "@/components/ui/button";
import { Icons } from "@/app/ui/icons";

export function SavedItems() {
    return (
        <Button variant="outline" size="icon">
            <Icons.saved className="h-[1.3rem] w-[1.3rem]" />
        </Button>
    );
}
