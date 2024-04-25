import Categories from "@/app/components/HomePage/Categories";
import ProductCarousel from "../components/HomePage/Carousel";

export default function Page() {
  return (
    <>
      <Categories />
      <div className="p-4 lg:m-9 lg:mt-12">
        <h1 className="pb-3 text-2xl font-semibold">Recent Items</h1>
        <ProductCarousel />
      </div>
    </>
  );
}
