import ProductPage from "@/app/components/ProductPage";
import { fetchProductDetails } from "@/lib/actions/fetchProduct.actions";

export default async function Page({ params }: { params: { id: string } }) {
  const ProductInfo = await fetchProductDetails(params.id); //ayo
  return <ProductPage productInfo={ProductInfo} />;
}
