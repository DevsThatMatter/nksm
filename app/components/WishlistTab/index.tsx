import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const WishlistTab = () => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Wishlist Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Image
              alt="Wishlist product image"
              className="aspect-square h-24 w-24 rounded-md bg-gray-200 object-contain"
              height="100"
              src="/logon.svg"
              width="100"
            />
            <div>
              <div className="text-lg font-medium text-gray-200">
                Product Name
              </div>
              <div className="text-sm text-gray-500">
                Added on February 10, 2023
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default WishlistTab;
