import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import { Seller } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";

function SellerCard({ sellerInfo }: { sellerInfo: Seller }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Seller Details</h2>
      <div className="my-2 flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-[3rem] w-[3rem]">
            <AvatarImage alt="Seller" src={sellerInfo.Avatar} />
            <AvatarFallback>{sellerInfo.First_Name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="font-semibold">
              {sellerInfo.First_Name} {sellerInfo.Last_Name}
            </p>
            <p className="text-sm text-gray-500">{sellerInfo.Phone_Number}</p>
          </div>
        </div>
        <Button
          variant="default"
          className="relative my-auto items-center justify-center bg-green-600 hover:bg-green-700"
        >
          <Icons.sendIcon className="absolute bottom-0 left-2 top-0 m-auto h-4 w-4" />
          <span className="pl-4">Message</span>
        </Button>
      </div>
    </div>
  );
}

export default SellerCard;
