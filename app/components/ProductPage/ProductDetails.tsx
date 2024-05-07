import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import { Product, type ConditionEnum } from "@/types";

export const renderConditionIcon = (condition: ConditionEnum | string) => {
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
        <p className="text-2xl font-semibold">₹{productInfo.Price}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex ">
          <p className="my-1 flex items-center justify-center rounded-2xl border border-muted-foreground p-1 px-2 text-xs text-muted-foreground dark:font-semibold">
            {renderConditionIcon(productInfo.Condition)}
            {productInfo.Condition}
          </p>
          <p
            className={`m-1 flex items-center justify-center rounded-3xl p-1 px-2 text-xs ${productInfo.Negotiable ? "bg-green-200 text-green-500 dark:bg-green-800/40 dark:text-green-400" : "bg-sky-200 text-sky-500 dark:bg-sky-800/40 dark:text-sky-400"}`}
          >
            {productInfo.Negotiable ? "Negotiable" : "Not Negotiable"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Available: {productInfo.Quantity}
        </p>
      </div>
      <div>
        <pre className="my-2 whitespace-pre-line break-all font-sans text-muted-foreground">
          {productInfo.Description}
        </pre>
      </div>
    </div>
  );
};

export const ProductDetailsSkeleton = () => {
  return (
    <div className={cn("mt-4")}>
      <div className="flex justify-between">
        <h1 className="w-32 animate-pulse whitespace-pre rounded-md bg-primary/10 text-2xl font-bold">
          {" "}
        </h1>
        <p className="w-16 animate-pulse whitespace-pre rounded-md bg-primary/10 text-2xl font-semibold">
          {" "}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex ">
          <p className="my-1 w-[4.5rem] animate-pulse whitespace-pre rounded-2xl border border-muted-foreground bg-primary/10 p-1 px-2 text-xs dark:font-semibold">
            {" "}
          </p>
          <p className="m-1 w-[4.5rem] animate-pulse whitespace-pre rounded-3xl bg-primary/10 p-1 px-2 text-xs">
            {" "}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Available:{" "}
          <span className="animate-pulse whitespace-pre rounded-md bg-primary/10">
            {"     "}
          </span>
        </p>
      </div>
      <div className="mt-2 space-y-2">
        <p className="w-full animate-pulse whitespace-pre bg-primary/10"> </p>
      </div>
    </div>
  );
};

export default ProductDetails;
