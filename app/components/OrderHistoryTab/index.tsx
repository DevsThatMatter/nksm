import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const OrderHistoryTab = () => {
  return (
    <div className="mt-3 flex flex-col gap-3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order #123456</CardTitle>
          <CardDescription>Placed on January 25, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Image
              alt="Product image"
              className="aspect-square h-24 w-24 rounded-md bg-gray-200 object-contain"
              height="100"
              src="/logon.svg"
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
  );
};
export default OrderHistoryTab;
