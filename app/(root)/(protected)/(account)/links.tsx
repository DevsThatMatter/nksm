"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinksClass {
  defaultClassName: string;
  activeClassName: string;
  inactiveClassName: string;
}
const ActiveLinks = ({
  defaultClassName,
  activeClassName,
  inactiveClassName,
}: LinksClass) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tabs"
      className="relative -mb-px flex justify-center space-x-8 text-center sm:justify-start"
    >
      <Link
        href="/account"
        aria-current="page"
        className={`${pathname === "/account" ? activeClassName : inactiveClassName} ${defaultClassName}`}
      >
        Account Info
      </Link>
      <Link
        href="/orders"
        className={`${pathname === "/orders" ? activeClassName : inactiveClassName} ${defaultClassName}`}
      >
        Orders
      </Link>
    </nav>
  );
};
export default ActiveLinks;
