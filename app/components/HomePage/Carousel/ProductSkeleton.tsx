import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent } from "../../ui/card";
import { CarouselItem } from "../../ui/carousel";
const ProductSkeleton = () => {
  return (
    <CarouselItem className="basis-1/2 min-[200px]:basis-11/12 min-[300px]:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <Card className="m-1 min-w-[120px]">
        <CardContent className="relative flex aspect-square flex-col justify-center p-3 ">
          <Skeleton className="aspect-square w-[100%] grow rounded" />
          <div className="mt-2 flex items-center justify-between">
            <Skeleton className="line-clamp-1 w-[50%] overflow-hidden overflow-ellipsis font-semibold hover:underline min-[280px]:text-lg min-[300px]:max-w-12 min-[370px]:max-w-24 min-[440px]:max-w-52 sm:max-w-44 sm:text-xl md:max-w-40 lg:max-w-32 lg:text-base 2xl:max-w-48 2xl:text-xl min-[2000px]:max-w-60">
              <span className="opacity-0">0</span>
            </Skeleton>
            <Skeleton className="h-5 w-[20%]" />
          </div>
          <Skeleton className="mt-1 h-7 w-full md:h-9 lg:h-7" />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default ProductSkeleton;
