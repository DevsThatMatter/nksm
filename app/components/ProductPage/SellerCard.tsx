import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import { Seller } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import OfferForm from "./offer-form";
import { auth } from "@/auth";
import mongoose from "mongoose";
interface SellerCardProps {
  sellerInfo: Seller;
  productName: string;
  productImages: string[];
  productId: mongoose.Types.ObjectId;
}

async function SellerCard({
  sellerInfo,
  productName,
  productImages,
  productId,
}: SellerCardProps) {
  const senderEmail = (await auth())?.user?.email;
  console.log(sellerInfo);
  return (
    <div>
      <h2 className="text-lg font-semibold">Seller Details</h2>
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
              reciverEmail={sellerInfo.Email}
              senderEmail={senderEmail ?? ""}
              productImages={productImages}
              productName={productName}
              productId={String(productId)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default SellerCard;
{
  /* <DialogContent className="rounded-md">
            <CardTitle className="text-2xl">Enter Your Price</CardTitle>
            <CardDescription>Let us know your offer.</CardDescription>
            <CardContent className="space-y-2 p-4">
              <Input
                className="w-full"
                min="0"
                placeholder="How much are you willing to pay?"
                step="0.01"
                type="number"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your bid will be submitted to the seller.
              </p>
            </CardContent>
            <CardFooter className="flex">
              <Button className="w-full bg-green-600 hover:bg-green-700 dark:text-foreground">
                Submit Offer
              </Button>
            </CardFooter>
          </DialogContent> */
}
