import ControlPanel from "@/app/components/Chat/panels/control-panel";
import { Dialog, DialogCloseBtn } from "@/app/components/dialog";
import { Icons } from "@/app/utils/icons";
import { auth } from "@/auth";
import { getAllChats } from "@/lib/actions/chat.actions";
import { redirect } from "next/navigation";

export default async function page() {
  const userId = (await auth())?.user?.id;
  if (userId) {
    const { data } = await getAllChats(userId);

    return (
      // there is an issue in here, that the states required for the navigation are not reset when unmount happen ubruptly
      <Dialog className="max-w-sm md:max-w-md" location={"start"}>
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
