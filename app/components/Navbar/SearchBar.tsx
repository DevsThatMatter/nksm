import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Icons } from "@/app/utils/icons";

export default function SearchBar() {
  return (
    <form>
      <div className="relative">
        <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <div>
          <Input
            placeholder="Search"
            className="pl-8 w-100% sm:w-56 md:w-[31.4rem]"
          />
        </div>
      </div>
    </form>
  );
}
