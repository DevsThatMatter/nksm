import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent } from "../../ui/card";
import { CarouselItem } from "../../ui/carousel";
const ProductSkeleton = () => {
  return (
    <CarouselItem className="basis-1/2 min-[200px]:basis-11/12 min-[300px]:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <Card className="min-w-[120px] m-1">
        <CardContent className="flex flex-col aspect-square justify-center p-3 relative ">
          <Skeleton className="rounded aspect-square grow w-[100%]" />
          <div className="flex justify-between items-center mt-2">
            <Skeleton className="overflow-hidden font-semibold sm:text-xl lg:text-base 2xl:text-xl hover:underline min-[280px]:text-lg min-[2000px]:max-w-60 min-[370px]:max-w-24 min-[300px]:max-w-12 min-[440px]:max-w-52 overflow-ellipsis line-clamp-1 sm:max-w-44 md:max-w-40 lg:max-w-32 2xl:max-w-48 w-[50%]">
              <span className="opacity-0">0</span>
            </Skeleton>
            <Skeleton className="h-5 w-[20%]" />
          </div>
          <Skeleton className="w-full mt-1 h-7 md:h-9 lg:h-7" />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductSkeleton;
