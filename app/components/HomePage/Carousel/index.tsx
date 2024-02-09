"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import ProductCard from "@/app/components/HomePage/Carousel/ProductCard";
import { fetchRecentProducts } from "@/lib/actions/fetchProduct.actions";
import { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";

const options: EmblaOptionsType = { loop: true, align: "center" };
const plugins: EmblaPluginType[] = [Autoplay({ delay: 5000 })];

const ProductCarousel = () => {
  const [products, setProducts] = useState<any[] | undefined>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchRecentProducts();
      setProducts(data);
    };
    fetchProducts();
    }, []);;
  return (
    <>
      <div className="lg:m-9 lg:mt-12 p-4">
        <h1 className="text-2xl font-semibold">Recent Items</h1>
        <Carousel className="w-full" opts={options} plugins={plugins}>
        <CarouselContent>
            { products && products!.map((product)=> (
              <CarouselItem
                key={product._id}
                className="lg:basis-1/4 basis-1/2 md:basis-1/3 xl:basis-1/5 xs:basis-1/3"
              >
                <ProductCard
                  image_url={product.Images[0]}
                  name={product.Product_Name}
                  price={product.Price}
                  description={product.Description}
                />
              </CarouselItem>
            ))  }
            {!products && Array(10).fill(0).map((_, index) => (<CarouselItem className="lg:basis-1/4 basis-1/2 md:basis-1/3 xl:basis-1/5 xs:basis-1/3" key={index}><ProductSkeleton/></CarouselItem>)) }
          </CarouselContent> 
          <CarouselPrevious className="hidden lg:flex"/>
          <CarouselNext className="hidden lg:flex"/>
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;
