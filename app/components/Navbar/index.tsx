import UserProfile from "./UserProfile";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./SavedItems";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "../Chat/chat-panel";
import SearchBar from "./SearchBar";
import { ReactNode, Suspense } from "react";
import { fetchRecentProductS } from "@/lib/actions/products.actions";
import { cn } from "@/app/utils";
import { Button } from "../ui/button";
import { countUnreadMessages } from "@/lib/actions/chat.actions";
import { Icons } from "@/app/utils/icons";
import { Input } from "../ui/input";

const Navbar = ({
  children = (
    <>
      <Link href="/add-listing" prefetch>
        <Button variant="default" className="relative">
          <Icons.add className="absolute bottom-0 left-2 top-0 m-auto h-5 w-5" />
          <span className="hidden pl-4 sm:inline-block"> Add Listing </span>
        </Button>
      </Link>
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
  return (
    <nav className="sticky left-0 right-0 top-0 z-50 flex max-h-[4.769rem] justify-center bg-background shadow-md lg:justify-between">
      {!className && (
        <Link href="/" className="mx-3 my-1">
          <Image
            src="/logon.svg"
            alt="Logo"
            width={175}
            height={175}
            className="logo mt-2 hidden dark:invert lg:block"
          />
        </Link>
      )}
      <div
        className={cn("nav-items mr-5 flex items-center space-x-5", className)}
      >
        <Suspense
          fallback={<Input className="pl-8 sm:w-56 md:w-[31.4rem]" readOnly />}
          key="search"
        >
          <SearchSection />
        </Suspense>
        {children}
      </div>
    </nav>
  );
};

export default Navbar;

const SearchSection = async () => {
  const products = (await fetchRecentProductS()) || [];
  return <SearchBar products={products} className="my-5 ml-3" />;
};
