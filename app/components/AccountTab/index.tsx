import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import PencilIcon from "../ui/PencilIcon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import Image from "next/image";

export default async function AccountTab() {
  const userData = (await auth())?.user;
  console.log("slfkjslfjslkflkdjfsldfjslfjslkfjslk");
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
        <Image
          src={userData?.image!}
          alt="Profile picture"
          width={45}
          height={45}
          className="rounded-full"
        />
        <Button className="ml-0 mt-1 sm:ml-4 sm:mt-0" variant="secondary">
          Change
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="mt-4 flex items-center justify-center gap-4 sm:mt-0 sm:justify-start sm:gap-2">
          <Input
            className="w-1/3"
            placeholder="First Name"
            type="text"
            value={userData?.name?.trim()}
          />
          <PencilIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center justify-center px-14 sm:justify-start sm:px-0">
          <Input
            className="w-3/4 sm:w-1/3"
            placeholder="Email"
            type="email"
            value={userData?.email?.trim()}
            disabled
          />
          <PencilIcon className="ml-2 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center justify-center px-14 sm:justify-start sm:px-0">
          <Input
            className="w-3/4 sm:w-1/3"
            placeholder="Add a phone number"
            type="tel"
          />
          <PencilIcon className="ml-2 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
