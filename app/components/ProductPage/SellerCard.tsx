import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import { Seller } from "@/types";
import React from "react";
import { Button } from "../ui/button";

function SellerCard({ sellerInfo }: { sellerInfo: Seller }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Seller Details</h2>
      <div className="flex justify-between my-2">
        <div className="flex items-center">
          <Avatar className="h-[3rem] w-[3rem]">
            <AvatarImage alt="Seller" src={sellerInfo.Avatar}/>
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="font-semibold">{sellerInfo.Username}</p>
            <p className="text-sm text-gray-500">5 Ads</p>
          </div>
        </div>
        <Button variant="default" className="items-center justify-center my-auto bg-green-600 hover:bg-green-700">Send a message</Button>
      </div>
      <div className="mt-2">
        <p className="text-sm">{sellerInfo.Phone_Number}</p>
        <p className="mt-1 text-sm text-gray-500">No Reviews Yet</p>
      </div>
    </div>
  );
}

export default SellerCard;
