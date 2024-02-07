import { Card, CardContent } from "../../ui/card";
const ProductSkeleton = () => {
  return (
    <div className="p-1">
      <Card className="min-w-[120px] animate-pulse">
        <CardContent className="flex aspect-square items-center justify-center p-3">
            <div className="flex flex-col justify-center">
              <div className="2xl:w-[240px] min-[2000px]:min-w-72 lg:w-48 md:w-56 sm:w-68 min-[240px]:w-32 min-[440px]:w-44 min-[550px]:w-60 bg-gray-400 min-[240px]:h-32 min-[440px]:h-40 sm:h-40 h-56 rounded-md"></div>
              <div className="flex justify-between items-center mt-2">
              <h1 className="2xl:w-40 min-[2000px]:w-60 lg:w-32 md:w-40 sm:w-44 min-[240px]:w-20 min-[440px]:w-32 bg-gray-400 h-4 rounded-md"></h1>
              <span className="2xl:w-12 min-[2000px]:w-15 lg:w-8 md:w-10 sm:w-11 min-[240px]:w-5 min-[440px]:w-8 bg-gray-400 h-4 rounded-md"></span>
              </div>
              <p className="mt-2 2xl:w-60 min-[2000px]:w-60 lg:w-48 md:w-56 sm:w-68 min-[240px]:w-32 min-[440px]:w-44 min-[550px]:w-60 bg-gray-400 h-8 rounded-md"></p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSkeleton;
