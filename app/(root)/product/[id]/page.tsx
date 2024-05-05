import ProductCarousel from "@/app/components/HomePage/Carousel";
import ProductPage, { ProductPageSkeleton } from "@/app/components/ProductPage";
import { Suspense } from "react";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div key="1" className="mx-auto max-w-full p-4">
      <div className="gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-2">
        <Suspense fallback={<ProductPageSkeleton />} key={"product-page"}>
          <ProductPage id={id} />
        </Suspense>
        <div className="col-span-2 m-2 mt-8">
          <h1 className="pb-3 text-2xl font-semibold">You may also like:</h1>
          <ProductCarousel productPageCarousel arrows={false} key="carousel" />
        </div>
      </div>
    </div>
  );
}
