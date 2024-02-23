import UserProfile from "./UserProfile";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./SavedItems";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "@/app/components/Chat/ChatsPanel";
import { AddListing } from "../AddListing";
import SearchBar from "./SearchBar";
import { ReactNode, Suspense } from "react";
import { auth } from "@/auth";
import { fetchRecentProductS } from "@/lib/actions/fetchProduct.actions";
import { cn } from "@/app/utils";

const Navbar = async ({
  children = (
    <>
      <AddListing />
      <UserChat />
      <SavedItems />
      <Separator orientation="vertical" className="h-10" />
      <UserProfile />
    </>
  ),
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const products = (await fetchRecentProductS()) || [];
  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-50 bg-background shadow-md">
        <nav className="max-h-30 flex justify-center lg:justify-between">
          {!className && (
            <div className="h-[4.769rem]">
              <Link href="/">
                <Image
                  src="/logon.svg"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="logo mx-3 my-2 mt-3 hidden dark:invert lg:block"
                />
              </Link>
            </div>
          )}
          <div
            className={cn(
              "nav-items mr-5 flex items-center space-x-5",
              className,
            )}
          >
            <SearchBar products={products} className="my-5 ml-3" />
            {children}
          </div>
        </nav>
        <Separator orientation="horizontal" />
      </div>
    </>
  );
};

export default Navbar;
