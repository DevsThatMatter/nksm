import { fetchOrderHistory } from "@/lib/actions/products.actions";
import Link from "next/link";
import SearchCard from "../Search/SearchCard";
import { redirect } from "next/navigation";

const OrdersTab = async ({ email }: { email: string }) => {
  const userInfo = await fetchOrderHistory(email);
  !userInfo && redirect("/");

  return (
    <main className="flex w-full justify-around gap-x-3">
      <div className="mt-4 flex w-[50%] flex-col items-center gap-3 sm:mt-6">
        <p className="text-xl font-bold">Ordered Products</p>
        <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 sm:-mt-2">
          {!userInfo.Ordered_Products.length ? (
            <>
              <div className="text-gray-500">
                No orders to show here. Maybe you should buy something.
              </div>
              <Link href="/" className="hover:text-gray-200 hover:underline">
                Check out our products <span className="ml-1">&#x2934;</span>
              </Link>
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
      </div>
      <div className="mt-4 flex w-[50%] flex-col items-center gap-3 sm:mt-6">
        <p className="text-xl font-bold">Listed Products</p>
        <div className="flex w-full flex-col items-center justify-center gap-3 overflow-auto rounded-lg border-2 sm:-mt-2">
          {!userInfo.Owned_Products.length ? (
            <>
              <div className="text-gray-500">
                You have not listed any products yet.
              </div>
              <Link
                href="/add-listing"
                className="hover:text-gray-200 hover:underline"
              >
                Add a product <span className="ml-1">&#x2934;</span>
              </Link>
            </>
          ) : (
            <div>
              {userInfo.Owned_Products.map((product: any) => {
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
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default OrdersTab;
