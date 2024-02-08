import Categories from "@/app/components/HomePage/Categories";
import ProductCarousel from "../components/HomePage/Carousel";
import { auth } from "@/auth";
export default async function Page() {
  const session = await auth()
    return (
      <>
        <Categories />
        <ProductCarousel />
      </>
    );
}
