"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLinks = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tabs"
      className="-mb-px flex justify-center space-x-8 text-center sm:justify-start"
    >
      <Link
        href="/account"
        aria-current="page"
        className={`whitespace-nowrap border-b-2 ${pathname === "/account" ? "border-blue-500  text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-1 py-4 text-sm font-medium`}
      >
        Account Info
      </Link>
      <Link
        href="/orders"
        className={`whitespace-nowrap border-b-2 ${pathname === "/orders" ? "border-blue-500  text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-1 py-4 text-sm font-medium`}
      >
        Order History
      </Link>
      <Link
        href="/wishlist"
        className={`whitespace-nowrap border-b-2 ${pathname === "/wishlist" ? "border-blue-500  text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-1 py-4 text-sm font-medium`}
      >
        Wishlist
      </Link>
    </nav>
  );
};
export default ActiveLinks;
