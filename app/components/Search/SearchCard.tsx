import { CardContent, Card } from "@/app/components/ui/card";
import { ConditionEnum } from "@/types";
import { ObjectId } from "mongoose";
import { renderConditionIcon } from "../ProductPage/ProductDetails";
import ProductSaved from "../ProductSaved";
import Image from "next/image";

interface ProductCardProps {
  id: ObjectId;
  image_url: string;
  name: string;
  price: number;
  description: string;
  condition: keyof typeof ConditionEnum;
  negotiable: boolean;
}

const SearchCard = ({
  id,
  image_url,
  name,
  price,
  description,
  condition,
  negotiable,
}: ProductCardProps) => {
  return (
    <Card>
      <CardContent className="container relative flex flex-col items-start gap-6 p-3 sm:h-64 sm:flex-row sm:p-6">
        <div className="relative w-full sm:static sm:w-auto">
          <Image
            alt="Product Image"
            className="aspect-square overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800 max-sm:w-full"
            height={200}
            src={image_url}
            width={200}
          />
          <ProductSaved
            className="absolute right-0 top-0 mr-2 mt-2 cursor-pointer rounded-full bg-gray-200 p-1 sm:mr-5 sm:mt-6"
            id={id.toString()}
          />
        </div>
        <div className="grid gap-2 text-base sm:max-w-[calc(100%-16rem)]">
          <h2 className="break-word font-extrabold leading-tight md:text-xl">
            {name}
          </h2>
          <p className="line-clamp-3 overflow-ellipsis break-words text-base leading-normal">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <p className="my-1 flex items-center justify-center rounded-2xl border border-muted-foreground p-1 px-2 text-xs text-muted-foreground dark:font-semibold">
              {renderConditionIcon(condition)}
              {condition}
            </p>
            <p
              className={`flex items-center justify-center rounded-3xl p-1 px-2 text-xs max-sm:absolute max-sm:left-0 max-sm:top-0 max-sm:ml-4 max-sm:mt-4 ${negotiable ? "bg-green-200 text-green-500 dark:bg-green-500 dark:text-gray-200" : "bg-sky-200 text-sky-500 dark:bg-sky-500 dark:text-gray-200"}`}
            >
              {negotiable ? "Negotiable" : "Not Negotiable"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold">₹{price}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
