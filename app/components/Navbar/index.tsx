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
      <Separator orientation="vertical" className="h-10"/>
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
      <div className="sticky top-0 left-0 right-0 z-50 bg-background shadow-md">
        <nav className="flex lg:justify-between justify-center max-h-30">
          {!className && (
            <div className="h-[4.769rem]">
              <Link href="/">
                <Image
                  src="/logon.svg"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="dark:invert logo hidden lg:block my-2 mx-3 mt-3"
                />
              </Link>
            </div>
          )}
          <div
            className={cn(
              "nav-items flex space-x-5 items-center mr-5",
              className
            )}
          >
            <SearchBar products={products} className="ml-3 my-5" />
            {children}
          </div>
        </nav>
        <Separator orientation="horizontal" />
      </div>
    </>
  );
};

export default Navbar;
