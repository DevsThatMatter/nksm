import { Icons } from "@/app/utils/icons";
import { Button, buttonVariants } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";

export default function UserUnauthorized() {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">
            <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Please get authorized</h4>
              <div className="flex space-x-4 p-2">
                <Link
                  href={"/login"}
                  className={buttonVariants({ variant: "default" })}
                >
                  Sign in
                </Link>
                <Link
                  href={"/login"}
                  className={buttonVariants({ variant: "default" })}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
