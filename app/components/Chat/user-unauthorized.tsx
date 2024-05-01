import Link from "next/link";

import { Button, buttonVariants } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { Icons } from "@/app/utils/icons";

export default function UserUnauthorized() {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="p-5">
          <div className="flex flex-col justify-center space-y-5">
            <h4 className="text-center text-sm font-semibold">
              Please get authorized
            </h4>
            <Link
              href={"/login"}
              className={buttonVariants({ variant: "default" })}
            >
              Sign in
            </Link>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
