import ProductPage from "@/app/components/ProductPage";
import { fetchProductDetails } from "@/lib/actions/fetchProduct.actions";
import { Product } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const ProductInfo: any = await fetchProductDetails(params.id); //ayo
  return <ProductPage productInfo={ProductInfo} />;
}
