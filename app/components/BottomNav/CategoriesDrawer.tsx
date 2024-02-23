import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Separator } from "@/app/components/ui/separator";
import { categories } from "@/constants/categories";
import Link from "next/link";

const CategoriesDrawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Categories</DrawerTitle>
          </DrawerHeader>
          <Separator />
          <nav className="flex flex-col justify-center gap-2 p-2">
            {categories.map((category) => (
              <Link
                className="flex items-center justify-center p-2 font-semibold"
                href={`/search?&category=${category.name}`}
                key={category.name}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default CategoriesDrawer;
