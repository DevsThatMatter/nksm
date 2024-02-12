
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { AvatarImage, AvatarFallback, Avatar } from "@/app/components/ui/avatar"
import { Textarea } from "@/app/components/ui/textarea"
import ImageCard from "./ImageCard";
import ProductCarousel from "../HomePage/Carousel";

const ProductPage = () => {
  return (
    <div key="1" className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ImageCard />
          
          <ProductCarousel />
        </div>
        <div className="col-span-1">
          <div className="sticky top-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Comments</h2>
              <ScrollArea className="h-72 w-full mt-2 rounded-md border p-2">
                <div className="space-y-4">
                  <p>Kapana Naypore: Location can I see it and price negotiable?</p>
                  <p>Ms. Shreethi: I am also looking for red, similar type. Is it in manual also?</p>
                  <p>Boben: Comment?</p>
                </div>
              </ScrollArea>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Seller Details</h2>
              <div className="flex items-center mt-2">
                <Avatar>
                  <AvatarImage alt="Seller" src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="font-semibold">Sahil Gupta</p>
                  <p className="text-sm text-gray-500">5 Ads</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm">9818090107</p>
                <p className="mt-1 text-sm text-gray-500">No Reviews Yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};



export default ProductPage