import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { fetchOrderHistory } from "@/lib/actions/fetchProduct.actions";
import { Key } from "react";
import Link from "next/link";

const OrderHistoryTab = async ({ email }: { email: string }) => {
  const userInfo = await fetchOrderHistory(email);

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-3 sm:mt-6">
      {userInfo[0].Ordered_Products.length === 0 ? (
        <>
          <div className="flex h-52 w-full flex-col items-center justify-center gap-3 rounded-lg border-2  sm:-mt-2">
            <div className="text-gray-500">
              No orders to show here. Maybe you should buy something.
            </div>
            <Link href="/" className="hover:text-gray-200 hover:underline">
              Check out our products <span className="ml-1">&#x2934;</span>
            </Link>
          </div>
        </>
      ) : (
        userInfo[0].Ordered_Products.map((product: any, index: Key) => {
          return (
            <Card className="w-10/12 md:w-7/12 lg:w-[50%]" key={index}>
              <CardHeader>
                <CardTitle className="text-gray-400">
                  {product.Category}
                </CardTitle>
                <CardDescription>
                  Condition: {product.Condition}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative flex items-center space-x-4">
                  <Image
                    alt="Product image"
                    className="aspect-square h-24 w-24 rounded-md bg-gray-200 object-cover"
                    height="100"
                    src={product.Images[0]}
                    width="100"
                  />
                  <div>
                    <div className="text-lg font-medium text-black dark:text-gray-200 ">
                      {product.Product_Name.length > 23 ? (
                        <div>{product.Product_Name.substring(0, 23)}...</div>
                      ) : (
                        <div>{product.Product_Name}</div>
                      )}
                    </div>
                    <div className=" text-gray-500 *:hidden *:xl:block">
                      {product.Description.length > 40 ? (
                        <div>{product.Description.substring(0, 40)}...</div>
                      ) : (
                        <div>{product.Description}</div>
                      )}
                    </div>
                    <div className="text-lg text-gray-500 lg:absolute lg:bottom-[35%] lg:right-0">
                      Price: &#8377;{product.Price}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};
export default OrderHistoryTab;
