import React from "react";
import { Product } from "@/types";
import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";

const ProductDetails = ({
  productInfo,
  className,
}: {
  productInfo: Product;
  className?: string;
}) => {
  const renderConditionIcon = (condition: string) => {
    switch (condition) {
      case "Brand New":
        return <Icons.new className="mr-1 h-3 w-3" />;
      case "Like New":
        return <Icons.likeNew className="mr-1 h-3 w-3" />;
      case "Used":
        return <Icons.used className="mr-1 h-3 w-3" />;
      default:
        return null;
    }
  };
  return (
    <div className={cn("mt-4", className)}>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{productInfo.Product_Name}</h1>
        <p className="text-2xl font-semibold">₹{productInfo.Price}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex ">
          <p className="my-1 flex items-center justify-center rounded-2xl border border-muted-foreground p-1 px-2 text-xs text-muted-foreground">
            {renderConditionIcon(productInfo.Condition)}
            {productInfo.Condition}
          </p>
          <p
            className={`m-1 flex items-center justify-center rounded-3xl p-1 px-2 text-xs text-muted-foreground ${productInfo.Negotiable ? "bg-green-200 text-green-500 dark:bg-green-500 dark:text-green-800" : "bg-sky-200 text-sky-500 dark:bg-sky-500 dark:text-sky-900"}`}
          >
            {productInfo.Negotiable ? "Negotiable" : "Not Negotiable"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Available: {productInfo.Quantity}
        </p>
      </div>
      <div>
        <p className="my-2 break-words text-muted-foreground">
          {productInfo.Description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
