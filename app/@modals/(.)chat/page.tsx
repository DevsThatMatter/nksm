import { redirect } from "next/navigation";
import { Suspense } from "react";

import ControlPanel from "@/app/components/Chat/panels/control-panel";
import { Dialog } from "@/app/components/dialog";
import { Icons } from "@/app/utils/icons";
import { auth } from "@/auth";
import { getAllChats } from "@/lib/actions/chat.actions";

export default function page() {
  return (
    // there is an issue in here, that the states required for the navigation are not reset when unmount happen ubruptly
    <Dialog className="max-w-sm md:max-w-md" location={"start"}>
      <Suspense
        fallback={
          <Icons.loading className="mx-auto my-auto size-8 h-full animate-spin" />
        }
        key="chat"
      >
        <DelayedChat />
      </Suspense>
    </Dialog>
  );
}
const DelayedChat = async () => {
  const userId = (await auth())?.user?.id;
  if (!userId) redirect("/login");
  const { data } = await getAllChats(userId);

  return (
    <ControlPanel
      userId={userId}
      data={{
        resultWhereUserIsBuyer: data.resultWhereUserIsBuyer,
        resultWhereUserIsSeller1: data.resultWhereUserIsSeller1,
      }}
    />
  );
};
