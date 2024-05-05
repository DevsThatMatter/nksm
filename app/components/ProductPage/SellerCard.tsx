import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Seller } from "@/types";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/app/utils/icons";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { cn } from "@/app/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import OfferForm from "./offer-form";
import { Skeleton } from "../ui/skeleton";
interface SellerCardProps {
  sellerInfo: Seller;
  productName: string;
  productImages: string[];
  productId: mongoose.Types.ObjectId;
  is_archived: boolean;
  is_negotiable: boolean;
  price: number;
}

async function SellerCard({
  sellerInfo,
  productName,
  productImages,
  productId,
  is_archived,
  is_negotiable,
  price,
}: SellerCardProps) {
  const senderEmail = (await auth())?.user?.email;
  return (
    <div>
      <h2 className="mt-6 pb-3 text-2xl font-semibold lg:mt-0 lg:pb-0 lg:text-xl">
        Seller Details
      </h2>
      <div className="my-2 flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-[3rem] w-[3rem]">
            <AvatarImage alt="Seller" src={sellerInfo.Avatar} />
            <AvatarFallback>{sellerInfo.Name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="font-semibold">{sellerInfo.Name}</p>
            <p className="text-sm text-foreground">{sellerInfo.Username}</p>
          </div>
        </div>
        {!is_archived ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="relative my-auto items-center justify-center bg-green-600 hover:bg-green-700 dark:text-foreground"
              >
                <Icons.sendIcon className="absolute bottom-0 left-2 top-0 m-auto h-4 w-4" />
                <span className="pl-4">Send an Offer</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
              <OfferForm
                price={price}
                is_negotiable={is_negotiable}
                reciverEmail={sellerInfo.Email}
                senderEmail={senderEmail ?? ""}
                productImages={productImages}
                productName={productName}
                productId={String(productId)}
                isLoggedIn={senderEmail ? true : false}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <div
            className={cn(
              buttonVariants({ variant: "outline" }),
              "relative my-auto items-center justify-center border border-amber-500 dark:text-foreground",
            )}
          >
            <Icons.archived className="absolute bottom-0 left-2 top-0 m-auto h-4 w-4 text-amber-500" />
            <span className="pl-4 text-amber-500">Archived</span>
          </div>
        )}
      </div>
    </div>
  );
}
export function SellerCardSkeleton() {
  return (
    <div>
      <h2 className="mt-6 pb-3 text-2xl font-semibold lg:mt-0 lg:pb-0 lg:text-xl">
        Seller Details
      </h2>
      <div className="my-2 flex justify-between">
        <div className="flex items-center">
          <Skeleton className="size-[3rem] rounded-full" />
          <div className="ml-2">
            <p className="w-32 animate-pulse whitespace-pre rounded-md bg-primary/10 font-semibold">
              {" "}
            </p>
            <p className="mt-1 w-16 animate-pulse whitespace-pre rounded-md bg-primary/10 text-sm">
              {" "}
            </p>
          </div>
        </div>
        <Skeleton className="relative my-1 w-32 animate-pulse whitespace-pre bg-primary/10" />
      </div>
    </div>
  );
}

export default SellerCard;
