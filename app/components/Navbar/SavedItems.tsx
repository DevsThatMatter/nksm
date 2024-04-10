import { Icons } from "@/app/utils/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Image from "next/image";

import * as z from "zod";
import Link from "next/link";
import { cn } from "@/app/utils";
import { CategoryEnum, ConditionEnum } from "@/types";
import { fetchSavedProduct } from "@/lib/actions/fetchProduct.actions";
import DeleteSavedProducts from "./delete-saved-products";
import { auth } from "@/auth";

export interface SavedProduct {
  _id: string;
  Images: string[];
  Category: CategoryEnum;
  Description: string;
  Condition: ConditionEnum;
  Seller: string;
  Total_Quantity_Available: number;
  Price: number;
  is_archived: boolean;
  Negotiable: boolean;
  Product_Name: string;
  expires_in: Date;
}

export default async function SavedItems() {
  const email = (await auth())?.user?.email ?? "";

  const data = (await fetchSavedProduct({ email })).content as SavedProduct[];

  const renderConditionIcon = (condition: ConditionEnum | string) => {
    switch (condition) {
      case "Brand New":
        return <Icons.new className="mr-1 h-3 w-3" />;
      case "Like New":
        return <Icons.likeNew className="mr-1 h-3 w-3" />;
      case "Used":
        return <Icons.used className="mr-1 h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-scroll sm:max-w-sm md:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle>Saved Products</SheetTitle>
          <SheetDescription>Manage your saved products</SheetDescription>
        </SheetHeader>
        {data?.map((product, id) => (
          <div key={id} className="overflow-scroll">
            <Link href={`/product/${String(product._id)}`}>
              <SheetClose className="m-0 w-full p-0">
                <div
                  className={cn(
                    " w-full cursor-pointer border-b-2",
                    id === 0 && "border-t-2",
                  )}
                >
                  <div className="flex space-x-4 p-2">
                    <Image
                      width={200}
                      height={200}
                      alt="Product Image"
                      className="h-16 w-16 rounded-lg object-cover"
                      src={product.Images[0]}
                    />
                    <div className="ml-2 flex flex-grow flex-col">
                      <div className="flex items-center justify-between">
                        <h1 className="font-semibold">
                          {product.Product_Name}
                        </h1>
                        <h1 className="font-semibold">
                          {"₹ "}
                          {product.Price}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="my-1 flex items-center justify-center rounded-2xl border border-muted-foreground p-1 text-xs text-foreground">
                            {renderConditionIcon(product.Condition)}
                            {product.Condition}
                          </p>
                          <p
                            className={`mx-1 flex items-center justify-center rounded-3xl p-1 text-xs ${
                              product.Negotiable
                                ? "bg-green-200 text-green-500 dark:bg-green-500 dark:text-green-800"
                                : "bg-sky-200 text-sky-500 dark:bg-sky-500 dark:text-sky-900"
                            }`}
                          >
                            {product.Negotiable
                              ? "Negotiable"
                              : "Not Negotiable"}
                          </p>
                        </div>
                        <DeleteSavedProducts
                          productId={product._id}
                          email={email}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetClose>
            </Link>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
}
