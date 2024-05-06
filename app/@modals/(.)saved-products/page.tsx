import SavedItems from "@/app/components/Navbar/SavedItems";
import { Dialog } from "@/app/components/dialog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SavedProducts() {
  const userEmail = (await auth())?.user?.email;

  if (userEmail) {
    return (
      <Dialog className="max-w-sm" location={"end"}>
        <SavedItems />
      </Dialog>
    );
  }

  redirect("/login");
}
