import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel";
import ProductCard from "@/app/components/HomePage/Carousel/ProductCard";
import { fetchRecentProducts } from "@/lib/actions/products.actions";
import { Suspense } from "react";
import ProductSkeleton from "./ProductSkeleton";

const ProductCarousel = ({
  options = {
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  },
  productPageCarousel,
  arrows = true,
}: {
  className?: string | undefined;
  options?: EmblaOptionsType;
  productPageCarousel?: boolean;
  arrows?: boolean;
}) => {
  return (
    <Carousel className="w-full" opts={options}>
      <CarouselContent>
        <Suspense
          fallback={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <ProductSkeleton key={i} />
          ))}
          key="carousel"
        >
          <CarouselItems productPageCarousel={productPageCarousel} />
        </Suspense>
      </CarouselContent>
      {arrows && (
        <>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </>
      )}
    </Carousel>
  );
};

export const CarouselItems = async ({
  productPageCarousel,
}: {
  productPageCarousel?: boolean;
}) => {
  const data = await fetchRecentProducts();
  return data?.map((product) => (
    <ProductCard
      image_url={product.Images[0]}
      key={product._id.toString()}
      id={product._id.toString()}
      name={product.Product_Name}
      price={product.Price}
      description={product.Description}
      productPageCarousel={productPageCarousel}
      condition={product.Condition}
      negotiable={product.Negotiable}
    />
  ));
};
export default ProductCarousel;
