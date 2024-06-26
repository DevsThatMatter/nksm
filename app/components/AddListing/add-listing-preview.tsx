import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import { ConditionEnum } from "@/types";
import Image from "next/image";
import { PreviewInputs } from ".";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const AddListingPreview = (
  previewData: Omit<PreviewInputs, "price" | "negotiate" | "images"> & {
    price: number | string;
    negotiate: boolean | string;
    images: (File | string)[];
  },
) => {
  const renderConditionIcon = (condition: ConditionEnum | string) => {
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
    <div className={cn("mt-4 w-full")}>
      <Carousel className="w-full rounded-lg shadow-none">
        <CarouselContent>
          {previewData.images.map((image: File | string, index: number) => (
            <CarouselItem key={index} className="rounded-md">
              <Image
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt={`Image ${index + 1}`}
                width={1920}
                height={1080}
                className="aspect-video h-full w-full cursor-pointer rounded-lg object-fill"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-2 flex justify-between">
        <h1 className="text-xl font-bold">{previewData.iname}</h1>
        <p className="text-xl font-semibold">₹{previewData.price}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex ">
          <p className="my-1 flex items-center justify-center rounded-2xl border border-muted-foreground p-1 px-2 text-xs text-muted-foreground dark:font-semibold">
            {renderConditionIcon(previewData.condition)}
            {previewData.condition}
          </p>
          <p
            className={`m-1 flex items-center justify-center rounded-3xl p-1 px-2 text-xs ${previewData.negotiate === true || previewData.negotiate === "Yes" ? "bg-green-200 text-green-500 dark:bg-green-800/40 dark:text-green-400" : "bg-sky-200 text-sky-500 dark:bg-sky-800/40 dark:text-sky-400"}`}
          >
            {previewData.negotiate === true || previewData.negotiate === "Yes"
              ? "Negotiable"
              : "Not Negotiable"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Available: {previewData.quantity}
        </p>
      </div>
      <div>
        <pre className="my-2 line-clamp-3 overflow-ellipsis whitespace-pre-line break-all font-sans text-muted-foreground">
          {previewData.description}
        </pre>
      </div>
    </div>
  );
};
export default AddListingPreview;
