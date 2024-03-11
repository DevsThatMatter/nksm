import PencilIcon from "../ui/PencilIcon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import Image from "next/image";

export default async function AccountTab() {
  const userData = (await auth())?.user;
  const isOkay = false;
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center sm:h-16 sm:w-16">
          <Image
            src={userData?.image!}
            alt="Profile picture"
            width={100}
            height={100}
            className="rounded-full md:h-full md:w-full"
          />
        </div>
        <Button className="ml-0 mt-2 sm:ml-1 sm:mt-0" variant="secondary">
          Change
        </Button>
      </div>
      <div className="relative top-2 grid grid-cols-1 gap-6">
        <div className="flex items-center justify-center sm:justify-start sm:px-0">
          <Input
            className="w-3/5 sm:lg:w-1/3"
            placeholder="First Name"
            type="text"
            value={userData?.name?.trim()}
          />
        </div>

        <div className="flex items-center justify-center  sm:justify-start sm:px-0">
          <Input
            className="w-3/5 sm:lg:w-1/3"
            placeholder="Email"
            type="email"
            value={userData?.email?.trim()}
            disabled
          />
        </div>
        <div className="flex items-center justify-center  sm:justify-start sm:px-0">
          <Input
            className="w-3/5 sm:lg:w-1/3"
            placeholder="Add a phone number"
            type="tel"
          />
        </div>
        <Button
          className="mt-5 w-4/5 place-self-center sm:place-self-start sm:lg:w-1/3"
          variant="secondary"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
