import React from "react";
import { Product } from "@/types";
import { cn } from "@/app/utils";

const ProductDetails = ({
  productInfo,
  className,
}: {
  productInfo: Product;
  className?: string;
}) => {
  return (
    <div className={cn("mt-4", className)}>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{productInfo.Product_Name}</h1>
        <p className="text-l font-normal mr-3 ">{productInfo.Condition}</p>
      </div>
      <p className="text-xl font-semibold">₹{productInfo.Price}</p>
      <p className="text-l font-normal">Available: {productInfo.Quantity}</p>
      <div>
        <p className="mt-2 text-muted-foreground break-words">
          {productInfo.Description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
