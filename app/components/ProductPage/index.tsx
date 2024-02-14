import ImageCard from "./ImageCard";
import ProductCarousel from "../HomePage/Carousel";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types";
import SellerCard from "./SellerCard";
import CommentCard from "./CommentCard";

const ProductPage = ({ productInfo }: { productInfo: Product }) => {
  return (
    <div key="1" className="max-w-full mx-auto p-4">
      <div className="lg:grid lg:grid-cols-3 gap-4">
        <div className="col-span-2 h-auto">
          <ImageCard images={productInfo.Images} />
          <ProductDetails productInfo={productInfo} />
          <ProductCarousel />
        </div>
        <div className="col-span-1">
          <div className="sticky top-10 ">
            <SellerCard sellerInfo={productInfo.Seller} />
            <CommentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
