import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { PreviewInputs } from ".";

const AddListingPreview = (
  previewData: Omit<PreviewInputs, "price"> & { price: number | string },
) => {
  return (
    <Card>
      <CardContent className="relative flex items-start gap-6 p-6 @container">
        <div className="">
          {/* <Image
            alt="Product Image"
            className="aspect-square overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={200}
            src={previewData.images.length > 0 ? previewData.images[0] : ""}
            width={200}
          /> */}
        </div>
        <div className="grid gap-2 text-base">
          <h2 className="line-clamp-2 max-w-48 overflow-ellipsis font-extrabold leading-tight md:text-xl">
            {previewData.iname}
          </h2>
          <p className="line-clamp-3 max-w-48 overflow-ellipsis text-base leading-normal">
            {previewData.description}
          </p>
          <div className="flex items-center gap-2">
            <h4 className="font-bold">₹{previewData.price}</h4>
          </div>
          <div className="flex items-center gap-2">
            <ChevronRightIcon className="h-5 w-5 fill-muted" />
            <span className="text-sm text-muted-foreground">
              {previewData.condition}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default AddListingPreview;
