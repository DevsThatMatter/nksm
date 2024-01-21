import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/app/ui/icons";

export default function SearchBar() {
    return (
        <form>
            <div className="relative">
                <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <div>
                    <Input placeholder="Search" className="pl-8 w-100% sm:w-48 md:w-80" />
                </div>
            </div>
        </form>
    );
}
