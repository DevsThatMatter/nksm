import ControlPanel from "@/app/components/Chat/panels/control-panel";
import { Dialog } from "@/app/components/dialog";
import { auth } from "@/auth";
import { getAllChats } from "@/lib/actions/chat.actions";
import { redirect } from "next/navigation";

export default async function page() {
  const userId = (await auth())?.user?.id;
  if (userId) {
    const { data } = await getAllChats(userId);

    return (
      // there is an issue in here, that the states required for the navigation are not reset when unmount happen ubruptly
      <Dialog className="max-w-[90%] md:max-w-md" location={"start"}>
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
