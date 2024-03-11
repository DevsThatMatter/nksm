import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const OrderHistoryTab = () => {
  return (
    <div>
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
  );
};
export default OrderHistoryTab;
