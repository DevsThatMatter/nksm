import { fetchProductDetails } from "@/lib/actions/products.actions";
import { Product } from "@/types";
import { Suspense } from "react";

import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import ImageCard, { ImageCardSkeleton } from "./ImageCard";
import ProductDetails, { ProductDetailsSkeleton } from "./ProductDetails";
import SellerCard, { SellerCardSkeleton } from "./SellerCard";

const ProductPage = async ({ id }: { id: string }) => {
  const productInfo: Product = await fetchProductDetails(id);
  return (
    <>
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
          <Suspense fallback={<CommentSkeleton />} key="comments">
            <CommentCard productId={productInfo._id} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export const ProductPageSkeleton = () => {
  return (
    <>
      <div className="col-span-2 row-span-2">
        <ImageCardSkeleton />
        <ProductDetailsSkeleton />
      </div>
      <div className="col-span-1">
        <div className="sticky top-[6.3rem] mt-2">
          <SellerCardSkeleton />
          <CommentSkeleton />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
