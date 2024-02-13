import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import ImageCard from "./ImageCard";
import ProductCarousel from "../HomePage/Carousel";
import ProductDetails from "./ProductDetails";
import { Input } from "../ui/input";
import { Product } from "@/types";
import SellerCard from "./SellerCard";

const ProductPage = ({ productInfo }: { productInfo: Product }) => {

  return (
    <div key="1" className="max-w-full mx-auto p-4">
      <div className="lg:grid lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <ImageCard images={productInfo.Images}/>
          <ProductDetails productInfo={productInfo}/>
          <ProductCarousel />
        </div>
        <div className="col-span-1">
          <div className="sticky top-10 ">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Comments</h2>
              <ScrollArea className="h-72 w-full mt-2 rounded-md border p-2">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage
                        alt="Kapana Naypore"
                        src="/placeholder.svg?height=40&width=40"
                      />
                      <AvatarFallback>KN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Kapana Naypore</p>
                      <div className="bg-gray-200 rounded-lg p-2">
                        <p>Location can I see it and price negotiable?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage
                        alt="Ms. Shreethi"
                        src="/placeholder.svg?height=40&width=40"
                      />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Ms. Shreethi</p>
                      <div className="bg-gray-200 rounded-lg p-2">
                        <p>
                          I am also looking for red, similar type. Is it in
                          manual also?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage
                        alt="Boben"
                        src="/placeholder.svg?height=40&width=40"
                      />
                      <AvatarFallback>BO</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Boben</p>
                      <div className="bg-gray-200 rounded-lg p-2">
                        <p>Comment?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage
                        alt="Boben"
                        src="/placeholder.svg?height=40&width=40"
                      />
                      <AvatarFallback>BO</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Boben</p>
                      <p className="text-sm">Comment?</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <Input
                className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-gray-300 dark:border-gray-800 dark:focus:ring-gray-600"
                id="comment-input"
                placeholder="Ask about the product..."
              />
            </div>
            <SellerCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
