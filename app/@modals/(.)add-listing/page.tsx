import { AddListing } from "@/app/components/AddListing";
import { Dialog, DialogCloseBtn } from "@/app/components/dialog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ListingPage = async () => {
  const userData = await auth();
  if (!userData) {
    redirect("/login");
  }
  return (
    <Dialog
      className="grid max-w-lg gap-4 overflow-auto border focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
      location="center"
      disableClickOutside
    >
      <DialogCloseBtn className="absolute right-4 top-4 rounded-sm" />
      <AddListing />
    </Dialog>
  );
};
export default ListingPage;
