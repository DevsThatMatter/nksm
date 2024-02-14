import { CardContent, Card } from "@/app/components/ui/card";
import { ConditionEnum } from "@/types";
import { ObjectId } from "mongoose";
import ProductSaved from "../ProductSaved";
import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/product/${id}`}>
      <Card>
        <CardContent className="flex items-start gap-6 p-6">
          <Image
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
            height={200}
            src={image_url}
            width={200}
          />
          <div className="grid gap-2 text-base">
            <h2 className="font-extrabold text-xl leading-tight">{name}</h2>
            <p className="text-base leading-normal">{description}</p>
            <div className="flex items-center gap-2">
              <h4 className="font-bold">${price}</h4>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRightIcon className="w-5 h-5 fill-muted" />
              <span className="text-sm text-muted-foreground">{condition}</span>
            </div>
          </div>
          <ProductSaved
            className="absolute top-0 right-0 p-1 mt-4 mr-4 bg-gray-200 rounded-full sm:mt-6 sm:mr-6 lg:mt-5 lg:mr-5 2xl:mt-5 2xl:mr-6"
            id={id.toString()}
          />
        </CardContent>
      </Card>
    </Link>
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
