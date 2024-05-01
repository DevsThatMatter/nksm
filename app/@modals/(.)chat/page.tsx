import ControlPanel from "@/app/components/Chat/panels/control-panel";
import { Dialog, DialogCloseBtn } from "@/app/components/dialog";
import { auth } from "@/auth";
import { getAllChats } from "@/lib/actions/chat.actions";
import { redirect } from "next/navigation";

export default async function page() {
  const userId = (await auth())?.user?.id;
  if (userId) {
    const { data } = await getAllChats(userId);

    return (
      // there is an issue in here, that the states required for the navigation are not reset when unmount happen ubruptly
      <Dialog className="max-w-sm" location={"start"}>
        <div className="flex w-full justify-end">
          <DialogCloseBtn className=" absolute" />
        </div>
        <ControlPanel
          userId={userId}
          data={{
            resultWhereUserIsBuyer: data.resultWhereUserIsBuyer,
            resultWhereUserIsSeller1: data.resultWhereUserIsSeller1,
          }}
        />
      </Dialog>
    );
  }

  redirect("/login");
}
