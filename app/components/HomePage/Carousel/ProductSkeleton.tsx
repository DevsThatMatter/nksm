import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent } from "../../ui/card";
import { CarouselItem } from "../../ui/carousel";
const ProductSkeleton = () => {
  return (
    <CarouselItem className="lg:basis-1/4 basis-1/2 md:basis-1/3 xl:basis-1/5 xs:basis-1/3">
      <Card className="min-w-[120px] m-1">
        <CardContent className="flex flex-col aspect-square justify-center p-3 relative ">
          <Skeleton className="rounded  object-cover aspect-square grow w-[100%]" />
          <div className="flex justify-between items-center mt-2">
            <Skeleton className="2xl:text-xl lg:text-base sm:text-xl min-[280px]:text-lg font-semibold 2xl:max-w-48 min-[2000px]:max-w-60 lg:max-w-32 md:max-w-40 sm:max-w-44 min-[240px]:max-w-20 min-[440px]:max-w-32 overflow-ellipsis overflow-hidden hover:underline line-clamp-1 w-[50%]">
              <span className="opacity-0">0</span>
            </Skeleton>
            <Skeleton className="h-5 w-[20%]" />
          </div>
          <Skeleton className="lg:text-xs md:text-sm min-[300px]:text-sm text-gray-500 line-clamp-2 overflow-ellipsis mt-1 h-8 w-[100%]" />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductSkeleton;
