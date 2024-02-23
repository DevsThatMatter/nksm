import { CardContent, Card } from "@/app/components/ui/card";
import { ConditionEnum } from "@/types";
import { ObjectId } from "mongoose";
import ProductSaved from "../ProductSaved";
import Image from "next/image";

interface ProductCardProps {
  id: ObjectId;
  image_url: string;
  name: string;
  price: number;
  description: string;
  condition: ConditionEnum;
}

const SearchCard = ({
  id,
  image_url,
  name,
  price,
  description,
  condition,
}: ProductCardProps) => {
  return (
    <Card>
      <CardContent className="relative flex items-start gap-6 p-6 @container">
        <div className="">
          <Image
            alt="Product Image"
            className="aspect-square overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={200}
            src={image_url}
            width={200}
          />
          <ProductSaved
            className="absolute right-0 top-0 mr-5 mt-6 rounded-full bg-gray-200 p-1 "
            id={id.toString()}
          />
        </div>
        <div className="grid gap-2 text-base">
          <h2 className="font-extrabold leading-tight md:text-xl">{name}</h2>
          <p className="text-base leading-normal">{description}</p>
          <div className="flex items-center gap-2">
            <h4 className="font-bold">${price}</h4>
          </div>
          <div className="flex items-center gap-2">
            <ChevronRightIcon className="h-5 w-5 fill-muted" />
            <span className="text-sm text-muted-foreground">{condition}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function ChevronRightIcon({ className }: { className: string }) {
  return (
    <svg
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default SearchCard;
