import { Button } from "@/components/ui/button";
import { Icons } from "@/app/ui/icons";

export function SavedItems() {
  return (
    <Button variant="ghost" size="icon" className="ml-[3.7px!important]">
      {/* TODO */}
      <Icons.saved className="h-[1.4rem] w-[1.4rem] " />
    </Button>
  );
}
