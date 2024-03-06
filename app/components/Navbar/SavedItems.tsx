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
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { User } from "@/lib/models/user.model";
import { auth } from "@/auth";
import { Types, mongo } from "mongoose";

import * as z from "zod";
import { connectToDB } from "@/lib/database/mongoose";
import Link from "next/link";
import clsx from "clsx";
import { cn } from "@/app/utils";

const mongoId = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid ObjectId format",
});

async function fetchSavedProduct(userId: z.infer<typeof mongoId>) {
  try {
    await connectToDB();
    const res = await User.aggregate([
      {
        $match: {
          _id: new mongo.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "Saved_Products",
          foreignField: "_id",
          as: "savedProducts",
        },
      },
      {
        $project: {
          savedProducts: 1,
          _id: 0,
        },
      },
    ]);
    console.log("ownedProducts", res);
    return {
      content: res[0],
      status: 200,
      error: null,
    };
  } catch (error) {
    return {
      content: null,
      status: 500,
      error: error,
    };
  }
}

export default async function SavedItems() {
  const userId = "65c5e979afe71c6df760f704";

  const data = (await fetchSavedProduct(userId)) as any;
  console.log("data => ", data);
  // data =>  { content: [ { savedProducts: [Array] } ], status: 200, error: null }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="ld:w-[40vw] flex w-screen flex-col items-center sm:w-[40vw] md:w-[60vw]">
        <SheetHeader>
          <SheetTitle>Saved Products</SheetTitle>
          <SheetDescription>Manage your saved products</SheetDescription>
        </SheetHeader>
        {data.content?.savedProducts?.map((product: any, i: number) => (
          <Card key={i} className="w-full">
            <CardContent className="flex-1 p-2">
              <div className="flex space-x-5 p-4">
                <Image
                  width={200}
                  height={200}
                  alt="Product Image"
                  className="h-16 w-16 rounded-lg object-cover"
                  src={product.Images[0]}
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold">{product.Product_Name}</h1>
                  <div className="flex items-center gap-2 gap-x-5">
                    <div className="text-body font-semibold">
                      {"₹ "}
                      {product.Price}
                    </div>
                    {!product.Negotiable && (
                      <Badge className="flex items-center justify-center  rounded-full bg-blue-400 text-white">
                        Negotiable
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <SheetClose className=" w-full">
                <Link
                  href={`/product/${String(product._id)}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full rounded-full border border-gray-200 dark:border-gray-800",
                  )}
                >
                  View product
                </Link>
              </SheetClose>
            </CardContent>
          </Card>
        ))}
      </SheetContent>
    </Sheet>
  );
}
