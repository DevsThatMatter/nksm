import { Card, CardContent } from "@/app/components/ui/card";
import { ConditionEnum } from "@/types";
import { ObjectId } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { renderConditionIcon } from "../ProductPage/ProductDetails";
import ProductSaved from "../ProductSaved";

interface ProductCardProps {
  id: ObjectId;
  image_url: string;
  name: string;
  price: number;
  description: string;
  condition: keyof typeof ConditionEnum;
  negotiable: boolean;
  orderPage?: boolean;
}

const SearchCard = ({
  id,
  image_url,
  name,
  price,
  description,
  condition,
  negotiable,
  orderPage = false,
}: ProductCardProps) => {
  const product = {
    _id: id.toString(),
    Image: image_url,
    Condition: condition,
    Price: price,
    Negotiable: negotiable,
    Product_Name: name,
  };

  return (
    <Link href={`/product/${id}`} className="w-full">
      <Card className="my-4">
        <CardContent className="relative flex flex-col items-start gap-6 p-3 sm:h-64 sm:flex-row sm:p-6">
          <div className="relative w-full sm:static sm:w-auto">
            <Image
              alt="Product Image"
              className="aspect-square overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800 max-md:w-full"
              height={200}
              src={image_url}
              width={200}
            />
            <ProductSaved
              className={`${orderPage ? "hidden" : ""} absolute right-0 top-0 mr-2 mt-2 cursor-pointer rounded-full bg-gray-200 p-1 sm:mr-5 sm:mt-6`}
              product={product}
            />
          </div>
          <div className="grid gap-2 text-base md:max-w-[calc(100%-16rem)]">
            <h2 className="break-word font-extrabold leading-tight md:text-xl">
              {name}
            </h2>
            <p className="line-clamp-3 overflow-ellipsis break-words text-base leading-normal max-md:line-clamp-1 max-[430px]:line-clamp-3">
              {description}
            </p>
            <div className="flex items-center gap-2">
              <p className="my-1 flex items-center justify-center rounded-2xl border border-muted-foreground p-1 px-2 text-xs text-muted-foreground dark:font-semibold">
                {renderConditionIcon(condition)}
                {condition}
              </p>
              <p
                className={`m-1 flex items-center justify-center rounded-3xl p-1 px-2 text-xs ${negotiable ? "bg-green-200 text-green-500 dark:bg-green-800/40 dark:text-green-400" : "bg-sky-200 text-sky-500 dark:bg-sky-800/40 dark:text-sky-400"}`}
              >
                {negotiable ? "Negotiable" : "Not Negotiable"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-bold">₹{price}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SearchCard;
