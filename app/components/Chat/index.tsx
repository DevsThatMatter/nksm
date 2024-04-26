import { auth } from "@/auth";
import { getAllChats } from "@/lib/actions/chat.actions";

import ControlPanel from "./panels/control-panel";
import { Button } from "../ui/button";
import { Icons } from "@/app/utils/icons";
import { Sheet, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

export default async function Chat({
  children = (
    <Button variant="ghost" size="icon">
      <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
    </Button>
  ),
}: {
  children?: React.ReactNode;
}) {
  const userId = (await auth())?.user?.id;
  if (userId) {
    const data = await getAllChats(userId);
    return (
      <ControlPanel
        userId={userId}
        data={{
          resultWhereUserIsBuyer: data.data.resultWhereUserIsBuyer,
          resultWhereUserIsSeller1: data.data.resultWhereUserIsSeller1,
        }}
      >
        {children}
      </ControlPanel>
    );
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Link href={"/login"}>{children}</Link>
      </SheetTrigger>
    </Sheet>
  );
}
