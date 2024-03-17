import ProductPage from "@/app/components/ProductPage";
import { fetchProductDetails } from "@/lib/actions/fetchProduct.actions";
import { Product } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const ProductInfo: Product = await fetchProductDetails(params.id);
  // console.log("MOGUS:ASFHSAF", ProductInfo);
  return <ProductPage productInfo={ProductInfo} />;
}
