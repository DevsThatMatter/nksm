import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import ProductCard from "@/app/components/HomePage/Carousel/ProductCard";
import { fetchRecentProducts } from "@/lib/actions/fetchProduct.actions";
import { Suspense } from "react";
import ProductSkeleton from "./ProductSkeleton";
import { cn } from "@/app/utils";

const options: EmblaOptionsType = { loop: true, align: "center" };

const ProductCarousel = ({ className }: { className?: string | undefined }) => {
  return (
    <div className={cn("p-4 lg:m-9 lg:mt-12", className)}>
      <h1 className="pb-3 text-2xl font-semibold">Recent Items</h1>
      <Carousel className="w-full" opts={options}>
        <CarouselContent>
          <Suspense
            fallback={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          >
            <CarouselItems />
          </Suspense>
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
};

export const CarouselItems = async ({
  productPageCarousel,
}: {
  productPageCarousel?: boolean;
}) => {
  const data = await fetchRecentProducts();
  return data!.map((product) => (
    <ProductCard
      image_url={product.Images[0]}
      key={product._id}
      id={product._id}
      name={product.Product_Name}
      price={product.Price}
      description={product.Description}
      productPageCarousel={productPageCarousel}
    />
  ));
};
export default ProductCarousel;
