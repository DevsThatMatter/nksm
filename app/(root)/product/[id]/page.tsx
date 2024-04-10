import ProductPage from "@/app/components/ProductPage";
import { fetchProductDetails } from "@/lib/actions/products.actions";
import { Product } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const ProductInfo: Product = await fetchProductDetails(params.id);
  return <ProductPage productInfo={ProductInfo} />;
}
