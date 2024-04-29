import Image from "next/image";

import Link from "next/link";
import { cn } from "@/app/utils";
import { ConditionEnum } from "@/types";

import DeleteSavedProducts from "./delete-saved-products";
import { fetchSavedProduct } from "@/lib/actions/products.actions";
import { renderConditionIcon } from "../ProductPage/ProductDetails";

export interface SavedProduct {
  _id: string;
  Images: string[];
  Condition: ConditionEnum;
  Total_Quantity_Available: number;
  Price: number;
  is_archived: boolean;
  Negotiable: boolean;
  Product_Name: string;
  Description: string;
}

export default async function SavedItems({ email }: { email: string }) {
  const data = await fetchSavedProduct({ email });
  return (
    <aside className="w-full px-4 sm:max-w-sm md:max-w-md">
      <header className="mb-6 mt-5">
        <h1 className="text-2xl font-bold">Saved Products</h1>
        <p className="text-muted-foreground">Manage your saved products</p>
      </header>
      <ul
        className={cn(
          "h-[calc(100dvh-7rem)] overflow-y-auto",
          "flex flex-col space-y-4",
        )}
      >
        {data?.map((product, id) => (
          <li key={id}>
            <Link
              href={`/product/${String(product._id)}`}
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
                        "text-xs text-foreground",
                        "my-1 p-1",
                      )}
                    >
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
                      {product.Negotiable ? "Negotiable" : "Not Negotiable"}
                    </p>
                  </div>
                  <DeleteSavedProducts productId={product._id.toString()} />
                </section>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
