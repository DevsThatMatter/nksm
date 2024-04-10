import ImageCard from "./ImageCard";
import ProductCarousel, { CarouselItems } from "../HomePage/Carousel";
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
  return (
    <div key="1" className="mx-auto max-w-full p-4">
      <div className="gap-4 lg:grid lg:grid-cols-3">
        <div className="col-span-2 h-auto">
          <ImageCard images={productInfo.Images} />
          <ProductDetails productInfo={productInfo} />
          <div className={cn("m-2 mt-8")}>
            <h1 className="pb-3 text-2xl font-semibold">You may also like:</h1>

            <ProductCarousel productPageCarousel arrows={false} />
          </div>
        </div>
        <div className="col-span-1">
          <div className="sticky top-[6.3rem] mt-2">
            <SellerCard sellerInfo={productInfo.Seller} />
            <CommentCard productId={productInfo._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
