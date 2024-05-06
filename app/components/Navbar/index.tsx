import UserProfile from "./UserProfile";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "../Chat/chat-panel";
import SearchBar from "./SearchBar";
import { ReactNode, Suspense } from "react";
import {
  fetchRecentProductS,
  fetchSavedProduct,
} from "@/lib/actions/products.actions";
import { cn } from "@/app/utils";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";
import FetchedProducts from "./fetch-utils";
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
      <Suspense
        fallback={
          <Button variant="ghost" size="icon" disabled>
            <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
          </Button>
        }
      >
        <SavedIcon>
          <Button variant="ghost" size="icon">
            <Icons.saved className="h-[1.4rem] w-[1.4rem]" />
          </Button>
        </SavedIcon>
      </Suspense>
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
    <nav className="sticky left-0 right-0 top-0 z-50 flex max-h-[4.769rem] justify-center border-b border-b-border bg-background shadow-md lg:justify-between">
      {!className && (
        <Link href="/" className="mx-3 my-2">
          <Image
            src="/logon.svg"
            alt="Logo"
            width={150}
            height={150}
            className="logo mt-1 hidden dark:invert lg:block"
          />
        </Link>
      )}
      <div
        className={cn(
          "nav-items mr-5 flex h-[4.769rem] items-center space-x-5",
          className,
        )}
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

export const SavedIcon = async ({ children }: { children: ReactNode }) => {
  const savedProducts = await fetchSavedProduct();
  return (
    <Link href={"/saved-products"}>
      <FetchedProducts savedProducts={savedProducts} />
      {children}
    </Link>
  );
};

export default Navbar;

const SearchSection = async () => {
  const products = (await fetchRecentProductS()) || [];
  return <SearchBar products={products} className="my-5 ml-3" />;
};
