import ProductPage, { ProductPageSkeleton } from "@/app/components/ProductPage";
import { Suspense } from "react";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton />} key={"product-page"}>
      <ProductPage id={id} />
    </Suspense>
  );
}
