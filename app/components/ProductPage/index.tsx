import { cn } from "@/app/utils";
import { Product } from "@/types";
import ProductCarousel from "../HomePage/Carousel";
import CommentCard from "./CommentCard";
import ImageCard from "./ImageCard";
import ProductDetails from "./ProductDetails";
import SellerCard from "./SellerCard";

const ProductPage = ({ productInfo }: { productInfo: Product }) => {
  const options: EmblaOptionsType = { loop: true, align: "center" };
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
            <CommentCard productId={productInfo._id} />
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

export default ProductPage;
