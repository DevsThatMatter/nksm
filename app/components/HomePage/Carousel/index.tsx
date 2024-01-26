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
import { products } from '@/constants/products'

const options: EmblaOptionsType = { loop: true, align: "center" };
const plugins: EmblaPluginType[] = [Autoplay({ delay: 5000 })];
const ProductCarousel = () => {
  return (
    <>
      <div className="lg:m-9 lg:mt-12 p-4">
        <h1 className="text-2xl font-semibold">Recent Items</h1>
        <Carousel className="w-full" opts={options} plugins={plugins}>
          <CarouselContent>
            {
            products.map((product)=> (
              <CarouselItem
                key={product.name}
                className="lg:basis-1/4 basis-1/2 md:basis-1/3 xl:basis-1/6 xs:basis-1/3"
              >
                <ProductCard
                  image_url={product.image_url}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex"/>
          <CarouselNext className="hidden lg:flex"/>
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;