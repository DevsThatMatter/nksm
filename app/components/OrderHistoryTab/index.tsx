import { fetchOrderHistory } from "@/lib/actions/products.actions";
import Link from "next/link";
import SearchCard from "../Search/SearchCard";
import { redirect } from "next/navigation";

const OrderHistoryTab = async ({ email }: { email: string }) => {
  const userInfo = await fetchOrderHistory(email);
  !userInfo && redirect("/");

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-3 sm:mt-6">
      {!userInfo.Ordered_Products.length ? (
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
        userInfo.Ordered_Products.map((product: any) => {
          return (
            <SearchCard
              key={product._id.toString()}
              id={product._id}
              image_url={product.Images[0]}
              name={product.Product_Name}
              price={product.Price}
              description={product.Description}
              condition={product.Condition}
              negotiable={product.Negotiable}
            />
          );
        })
      )}
    </div>
  );
};
export default OrderHistoryTab;
