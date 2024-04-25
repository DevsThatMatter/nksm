"use client";
import Image from "next/image";

import Link from "next/link";
import { cn } from "@/app/utils";
import { ConditionEnum } from "@/types";

import DeleteSavedProducts from "./delete-saved-products";
import { auth } from "@/auth";
import { fetchSavedProduct } from "@/lib/actions/products.actions";
import { renderConditionIcon } from "../ProductPage/ProductDetails";

export interface SavedProduct {
  _id: string;
  Images: string[];
  Condition: ConditionEnum;
  Total_Quantity_Available: number;
  Price: number;
  Negotiable: boolean;
  Product_Name: string;
}

export default async function SavedItems() {
  const email = (await auth())?.user?.email ?? "";
  const data = await fetchSavedProduct({ email });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[85%] px-4 sm:max-w-sm md:max-w-md">
        <SheetHeader className="mb-6 mt-5">
          <SheetTitle className="text-2xl">Saved Products</SheetTitle>
          <SheetDescription>Manage your saved products</SheetDescription>
        </SheetHeader>
        <ul
          className={cn(
            "h-[calc(100dvh-7rem)] overflow-y-auto",
            "flex flex-col space-y-4",
          )}
        >
          {data?.map((product, id) => (
            <li key={id}>
              <Link href={`/product/${String(product._id)}`}>
                <SheetClose
                  className={cn(
                    "w-[95%] p-3",
                    "cursor-pointer drop-shadow-md hover:drop-shadow-lg",
                    "rounded-lg border",
                    "flex space-x-2 bg-muted md:space-x-4",
                  )}
                >
                  <Image
                    width={200}
                    height={200}
                    alt="Product Image"
                    className="h-16 w-16 rounded-lg object-cover"
                    src={product.Images[0]}
                  />
                  <article className="flex flex-grow flex-col">
                    <section className="flex items-center justify-between">
                      <h1 className="line-clamp-1 font-semibold">
                        {product.Product_Name}
                      </h1>
                      <h1 className="font-semibold">
                        {"₹ "}
                        {product.Price}
                      </h1>
                    </section>
                    <section className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p
                          className={cn(
                            "flex items-center justify-center",
                            "rounded-2xl border border-muted-foreground",
                            "text-sm text-foreground",
                            "my-1 p-1",
                          )}
                        >
                          {renderConditionIcon(product.Condition)}
                          {product.Condition}
                        </p>
                        <p
                          className={`mx-1 flex items-center justify-center rounded-3xl p-1 text-xs ${product.Negotiable
                              ? "bg-green-200 text-green-500 dark:bg-green-500 dark:text-green-800"
                              : "bg-sky-200 text-sky-500 dark:bg-sky-500 dark:text-sky-900"
                            }`}
                        >
                          {product.Negotiable ? "Negotiable" : "Not Negotiable"}
                        </p>
                      </div>
                      <DeleteSavedProducts
                        productId={product._id.toString()}
                        email={email}
                      />
                    </section>
                  </article>
                </SheetClose>
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
