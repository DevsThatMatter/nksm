import Link from "next/link";

import { Button, buttonVariants } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { Icons } from "@/app/utils/icons";

export default function UserUnauthorized({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
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
