import { UserProfile } from "./Profile";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./SavedItems";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "@/app/components/Chat/ChatsPanel";
import { AddListing } from "../AddListing";
import SearchBar from "./SearchBar";
import { auth } from "@/auth";
import { fetchRecentProducts } from "@/lib/actions/fetchProduct.actions";

const Navbar = async () => {
  const userData = await auth();
  const products = (await fetchRecentProducts()) || [];
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 bg-background shadow-md">
        <nav className="flex lg:justify-between justify-center max-h-30">
          <div className="">
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
          <div className="nav-items flex space-x-5 items-center mx-3 my-5 mr-5">
            <SearchBar products={products} />
            <AddListing />
            <UserChat />
            <SavedItems />
            <Separator orientation="vertical" />
            <UserProfile data={userData} />
          </div>
        </nav>
        <Separator orientation="horizontal"  />
      </div>
    </>
  );
};

export default Navbar;
