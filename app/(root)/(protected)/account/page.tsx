import { Tabs } from "@/app/components/ui/tabs";
import Link from "next/link";

import AccountTab from "@/app/components/AccountTab";
import { auth } from "@/auth";

export default async function Component() {
  const userData = (await auth())?.user;
  return (
    <div className="h-screen w-screen">
      <div className="w-full rounded-lg p-8 shadow ">
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
                className="whitespace-nowrap border-b-2 border-blue-500 px-1 py-4 text-sm font-medium text-blue-600"
                href=""
                prefetch
              >
                Account Info
              </Link>
              <Link
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                href="/orderhistory"
                prefetch
              >
                Order History
              </Link>
              <Link
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                href="/wishlist"
                prefetch
              >
                Wishlist
              </Link>
            </nav>
          </div>
          <div className="mt-6 pt-4">
            <AccountTab userData={userData} />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
