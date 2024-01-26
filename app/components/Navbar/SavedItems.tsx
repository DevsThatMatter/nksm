import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";

export function SavedItems() {
  return (
    <Button variant="ghost" size="icon">
      <Icons.saved className="h-[1.4rem] w-[1.4rem] " />
    </Button>
  );
}
