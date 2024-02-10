import { UserProfile } from "./Profile";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./SavedItems";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "@/app/components/Chat/ChatsPanel";
import { AddListing } from "../AddListing";
import SearchBar from "./SearchBar";
import { auth } from "@/auth";

const Navbar = async () => {
  const userData = await auth();
  return (
    <>
      <nav className="flex lg:justify-between justify-center p-5 max-h-22">
        <div className="logo hidden lg:block ">
          <Link href="/">
            <Image
              src="logon.svg"
              alt="Logo"
              width={140}
              height={140}
              className="dark:invert"
            />
          </Link>
        </div>
        <div className="nav-items flex space-x-5 items-center px-2">
          <SearchBar />
          <AddListing />
          <UserChat />
          <SavedItems />
          <Separator orientation="vertical" />
          <UserProfile data={userData}/>
        </div>
      </nav>
      <Separator orientation="horizontal" />
    </>
  );
};

export default Navbar;
