import { Avatar } from "./Avatar";

import Image from "next/image";
import Link from "next/link";
import { SavedItems } from "./SavedItems";
import { Separator } from "@/app/components/ui/separator";
import UserChat from "@/app/components/Chat/ChatsPanel";
import { AddListing } from "../AddListing";
import SearchBar from "./SearchBar";
import { auth } from "@/auth";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/database/mongoose";

const Navbar = async () => {
  const userEmail = (await auth())?.user?.email;

  async function getUserId() {
    "use server"
    try {
      await connectToDB();

      if (!userEmail) {
        return null;
      }

      const user = await User.findOne({ Email: userEmail });

      if (!user) {
        console.error("User not found:", userEmail);
        return null;
      }

      return user._id.toString();
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  }

  const id = (await auth())?.user?.id || await getUserId() ;
 

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
          <UserChat userId={id} />
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
