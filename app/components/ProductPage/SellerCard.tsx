import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import React from "react";

function SellerCard() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Seller Details</h2>
      <div className="flex items-center mt-2">
        <Avatar>
          <AvatarImage alt="Seller" src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>SG</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="font-semibold">Sahil Gupta</p>
          <p className="text-sm text-gray-500">5 Ads</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm">9818090107</p>
        <p className="mt-1 text-sm text-gray-500">No Reviews Yet</p>
      </div>
    </div>
  );
}

export default SellerCard;
