import { ModeToggle } from "@/app/ui/theme/mode-toggle";
import { Avatar } from "./navbarcomponents/Avatar";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./navbarcomponents/SavedItems";
import { Separator } from "@/components/ui/separator";
import UserChat from "@/components/Chat/userChat";
import { AddListing } from "./navbarcomponents/AddListing";
import SearchBar from "./navbarcomponents/SearchBar";

const Navbar = () => {
  return (
    <>
      <nav className="flex lg:justify-between justify-center p-5">
        <div className="logo hidden lg:block ">
          <Link href="/">
            <Image src="logo.svg" alt="Logo" width={150} height={150} className="invert"/>
          </Link>
        </div>
        <div className="nav-items flex space-x-5 items-center px-2">
          <SearchBar />
          <UserChat />
          <AddListing />
          <SavedItems />
          {/* <ModeToggle /> */}
          <Separator orientation="vertical" />
          <Avatar />
        </div>
      </nav>
      <Separator orientation="horizontal" />
    </>
  );
};

export default Navbar;
