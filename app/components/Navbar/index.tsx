import { Avatar } from "./Avatar";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./SavedItems";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "@/app/components/Chat/ChatsPanel";
import { AddListing } from "../AddListing";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <>
      <nav className="flex lg:justify-between justify-center p-5">
        <div className="logo hidden lg:block ">
          <Link href="/">
            <Image
              src="logon.svg"
              alt="Logo"
              width={150}
              height={150}
              className="dark:invert"
            />
          </Link>
        </div>
        <div className="nav-items flex space-x-5 items-center px-2">
          <SearchBar />
          <AddListing />
          <UserChat userId={""} />
          <SavedItems />
          <Separator orientation="vertical" />
          <Avatar />
        </div>
      </nav>
      <Separator orientation="horizontal" />
    </>
  );
};

export default Navbar;
