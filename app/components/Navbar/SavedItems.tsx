import { Icons } from "@/app/utils/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import mongoose, { Types, mongo } from "mongoose";

import * as z from "zod";
import { connectToDB } from "@/lib/database/mongoose";
import Link from "next/link";
import clsx from "clsx";
import { cn } from "@/app/utils";
import { CategoryEnum, ConditionEnum } from "@/types";

const shema = z.object({
  email: z.string().email(),
});

interface Product {
  _id: mongoose.Types.ObjectId;
  Images: string[];
  Category: CategoryEnum;
  Description: string;
  Condition: ConditionEnum;
  Seller: mongoose.Types.ObjectId;
  Total_Quantity_Available: number;
  Price: number;
  is_archived: boolean;
  Negotiable: boolean;
  Product_Name: string;
  expires_in: Date;
}

async function fetchSavedProduct({ email }: z.infer<typeof shema>) {
  try {
    await connectToDB();
    let res = await User.aggregate([
      {
        $match: {
          Email: "user1@example.com",
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
    const result = res[0] as { savedProducts: Product[] };
    return {
      content: result.savedProducts,
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
  const email = (await auth())?.user?.email ?? "";

  const data = await fetchSavedProduct({ email });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="ld:w-[40vw] flex w-screen flex-col items-start sm:w-[40vw] md:w-[60vw]">
        <SheetHeader className="justify-start">
          <SheetTitle>Saved Products</SheetTitle>
          <SheetDescription>Manage your saved products</SheetDescription>
        </SheetHeader>
        {data.content?.map((product, i) => (
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
              <SheetFooter>
                <Link
                  href={`/product/${String(product._id)}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full rounded-full border border-gray-200 dark:border-gray-800",
                  )}
                >
                  <SheetClose className=" w-full">View product</SheetClose>
                </Link>
              </SheetFooter>
            </CardContent>
          </Card>
        ))}
      </SheetContent>
    </Sheet>
  );
}
