import { Suspense } from "react";
import { cn } from "@/app/utils";
import { fetchProductDetails } from "@/lib/actions/products.actions";
import { Product } from "@/types";
import ProductCarousel from "../HomePage/Carousel";
import CommentCard from "./CommentCard";
import ImageCard, { ImageCardSkeleton } from "./ImageCard";
import ProductDetails, { ProductDetailsSkeleton } from "./ProductDetails";
import SellerCard, { SellerCardSkeleton } from "./SellerCard";

const ProductPage = async ({ id }: { id: string }) => {
  const productInfo: Product = await fetchProductDetails(id);
  return (
    <div key="1" className="mx-auto max-w-full p-4">
      <div className="gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-2">
        <div className="col-span-2 row-span-2">
          <ImageCard images={productInfo.Images} />
          <ProductDetails productInfo={productInfo} />
        </div>
        <div className="col-span-1 row-span-3">
          <div className="sticky top-[6.3rem] mt-2">
            <SellerCard
              sellerInfo={productInfo.Seller}
              productName={productInfo.Product_Name}
              productImages={productInfo.Images}
              productId={productInfo._id}
            />
            <Suspense
              fallback={
                <div className="h-full w-full">Loading comments...</div>
              }
              key="chats"
            >
              <CommentCard productId={productInfo._id} />
            </Suspense>
          </div>
        </div>
        <div className={cn("col-span-2 m-2 mt-8")}>
          <h1 className="pb-3 text-2xl font-semibold">You may also like:</h1>

          <ProductCarousel productPageCarousel arrows={false} />
        </div>
      </div>
    </div>
  );
};

export const ProductPageSkeleton = () => {
  return (
    <div key="1" className="mx-auto max-w-full p-4">
      <div className="gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-2">
        <div className="col-span-2 row-span-2">
          <ImageCardSkeleton />
          <ProductDetailsSkeleton />
        </div>
        <div className="col-span-1">
          <div className="sticky top-[6.3rem] mt-2">
            <SellerCardSkeleton />

            <h2 className="mt-6 pb-3 text-2xl font-semibold lg:mt-3 lg:pb-0 lg:text-xl">
              Comments
            </h2>
            <div className="h-full w-full">Loading comments...</div>
          </div>
          <div className={cn("col-span-2 m-2 mt-8")}>
            <h1 className="pb-3 text-2xl font-semibold">You may also like:</h1>
            <ProductCarousel
              productPageCarousel
              arrows={false}
              key="carousel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
