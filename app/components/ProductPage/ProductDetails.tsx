import React from "react";
import { Product } from "@/types";
import { cn } from "@/app/utils";

const ProductDetails = ({productInfo, className }: { productInfo: Product , className?: string}) => {
  return (
    <div className={cn("mt-4", className)}>
        <h1 className="text-2xl font-bold">{productInfo.Product_Name}</h1>
        <p className="text-xl font-semibold">₹{productInfo.Price}</p>
      <div className="flex justify-between">
        <div>
        <p className="text-l font-normal">Available: {productInfo.Quantity}</p>
          <p className="text-l font-normal mr-10">
            Condition: {productInfo.Condition}
          </p>
        </div>
      </div>
      <p className="mt-2 text-muted-foreground">{productInfo.Description}</p>
    </div>
  );
};
function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default ProductDetails;
