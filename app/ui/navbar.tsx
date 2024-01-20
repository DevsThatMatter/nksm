import { ModeToggle } from "@/app/ui/theme/mode-toggle";
import { Avatar } from "./navbarcomponents/Avatar";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./navbarcomponents/SavedItems";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between p-3">
        <div className="logo">
          <Link href="/">
            <Image src="logo.svg" alt="Logo" width={125} height={125} />
          </Link>
        </div>
        <div className="nav-items flex space-x-2 p-1">
          <SavedItems />
          <Avatar />
          <ModeToggle />
        </div>
      </nav>
      <Separator />
    </>
  );
};

export default Navbar;
