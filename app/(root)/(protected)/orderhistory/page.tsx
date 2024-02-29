import { AvatarImage, AvatarFallback, Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/app/components/ui/card";
import { Tabs } from "@/app/components/ui/tabs";
import PencilIcon from "@/app/components/ui/PencilIcon";
import Link from "next/link";

export default function Component() {
  return (
    <div className="h-full w-full rounded-lg p-8 shadow">
      <h1 className="mb-4 text-center text-2xl font-bold sm:text-left">
        My Account
      </h1>
      <Tabs>
        <div className="mt-8 border-b">
          <nav
            aria-label="Tabs"
            className="-mb-px flex justify-center space-x-8 text-center sm:justify-start"
          >
            <Link
              aria-current="page"
              className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              href="/account"
            >
              Account Info
            </Link>
            <Link
              className="whitespace-nowrap border-b-2 border-blue-500 px-1 py-4 text-sm font-medium text-blue-600"
              href="#"
            >
              Order History
            </Link>
            <a
              className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              href="/wishlist"
            >
              Wishlist
            </a>
          </nav>
        </div>
        <div className="mt-6 pt-4">
          <div className="space-y-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Order #12345</CardTitle>
                <CardDescription>Placed on January 25, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <img
                    alt="Product image"
                    className="h-24 w-24 rounded-md bg-gray-200"
                    height="100"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div>
                    <div className="text-lg font-medium text-gray-200">
                      Product Name
                    </div>
                    <div className="text-sm text-gray-500">Quantity: 2</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className=" hidden space-y-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Wishlist Item</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <img
                    alt="Wishlist product image"
                    className="h-24 w-24 rounded-md bg-gray-200"
                    height="100"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div>
                    <div className="text-lg font-medium text-gray-900">
                      Product Name
                    </div>
                    <div className="text-sm text-gray-500">
                      Added on February 10, 2023
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
