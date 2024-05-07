import { fetchOrderHistory } from "@/lib/actions/products.actions";
import Link from "next/link";
import SearchCard from "../Search/SearchCard";
import { redirect } from "next/navigation";
import { Product } from "@/types";
import ClientDiv from "./client-div";

const OrdersTab = async ({ email }: { email: string }) => {
  const userInfo = await fetchOrderHistory(email);
  !userInfo && redirect("/");

  return (
    <main className="flex w-full justify-around gap-x-3 max-[835px]:flex-col">
      <div className="mt-4 flex w-[50%] grow flex-col items-center gap-3 max-[835px]:w-full sm:mt-6">
        <p className="text-xl font-bold">Ordered Products</p>
        {!userInfo.Ordered_Products.length ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 sm:-mt-2">
            <div className="text-gray-500">
              No orders to show here. Maybe you should buy something.
            </div>
            <Link href="/" className="hover:text-gray-200 hover:underline">
              Check out our products <span className="ml-1">&#x2934;</span>
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-auto">
            {userInfo.Ordered_Products.map((product: Product) => {
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
                  orderPage={true}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-4 flex w-[50%] grow flex-col items-center gap-3 max-[835px]:w-full sm:mt-6">
        <p className="text-xl font-bold">Listed Products</p>
        {!userInfo.Owned_Products.length ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 sm:-mt-2">
            <div className="text-gray-500">
              You have not listed any products yet.
            </div>
            <Link
              href="/add-listing"
              className="hover:text-gray-200 hover:underline"
            >
              Add a product <span className="ml-1">&#x2934;</span>
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-auto">
            {userInfo.Owned_Products.map((product: Product) => {
              return (
                <ClientDiv
                  id={product._id.toString()}
                  key={product.Product_Name}
                >
                  <SearchCard
                    key={product._id.toString()}
                    id={product._id}
                    image_url={product.Images[0]}
                    name={product.Product_Name}
                    price={product.Price}
                    description={product.Description}
                    condition={product.Condition}
                    negotiable={product.Negotiable}
                    orderPage={true}
                  />
                </ClientDiv>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};
export default OrdersTab;
