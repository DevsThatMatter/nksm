import ImageCard from "./ImageCard";
import { CarouselItems } from "../HomePage/Carousel";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types";
import SellerCard from "./SellerCard";
import CommentCard from "./CommentCard";
import { cn } from "@/app/utils";
import { Suspense } from "react";
import ProductSkeleton from "../HomePage/Carousel/ProductSkeleton";
import { Carousel, CarouselContent } from "../ui/carousel";
import { EmblaOptionsType } from "embla-carousel";

const ProductPage = ({ productInfo }: { productInfo: Product }) => {
  const options: EmblaOptionsType = { loop: true, align: "center" };
  return (
    <div key="1" className="mx-auto max-w-full p-4">
      <div className="gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-3">
        <div className="col-span-2 row-span-2">
          <ImageCard images={productInfo.Images} />
          <ProductDetails productInfo={productInfo} />
        </div>

        <div className="col-span-1 row-span-3">
          <div className="sticky top-[6.3rem] mt-2">
            <SellerCard sellerInfo={productInfo.Seller} />
            <CommentCard productId={productInfo._id} />
          </div>
        </div>
        <div className={cn("col-span-2 m-2 mt-8")}>
          <h1 className="pb-3 text-2xl font-semibold">You may also like:</h1>
          <Carousel className="w-full" opts={options}>
            <CarouselContent>
              <Suspense
                fallback={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <ProductSkeleton key={i} />
                ))}
              >
                <CarouselItems productPageCarousel />
              </Suspense>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
