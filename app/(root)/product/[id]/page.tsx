import ProductPage from "@/app/components/ProductPage";
import { auth } from "@/auth";
import { fetchProductDetails } from "@/lib/actions/fetchProduct.actions";
import { Product } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const ProductInfo: Product = await fetchProductDetails(params.id);
  const userdata = await auth();
  console.log(ProductInfo);
  return <ProductPage productInfo={ProductInfo} userData={userdata} />;
}
