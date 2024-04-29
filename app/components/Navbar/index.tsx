import UserProfile from "./UserProfile";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "../Chat/chat-panel";
import SearchBar from "./SearchBar";
import { ReactNode } from "react";
import { fetchRecentProductS } from "@/lib/actions/products.actions";
import { cn } from "@/app/utils";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";

const Navbar = async ({
  children = (
    <>
      <Link href="/add-listing">
        <Button variant="default" className="relative">
          <Icons.add className="absolute bottom-0 left-2 top-0 m-auto h-5 w-5" />
          <span className="hidden pl-4 sm:inline-block"> Add Listing </span>
        </Button>
      </Link>
      <UserChat />
      <Link href={"/saved-products"}>
        <Button variant="ghost" size="icon">
          <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </Link>
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
