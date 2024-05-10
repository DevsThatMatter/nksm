import { Suspense } from "react";

import { AddListing } from "@/app/components/AddListing";
import { AuthUtil } from "@/app/components/authutil";
import { Dialog, DialogCloseBtn } from "@/app/components/dialog";

const ListingPage = () => {
  return (
    <Dialog
      className="max-w-lg overflow-auto border focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
      contentClassName="grid gap-4"
      location="center"
      disableClickOutside
    >
      <Suspense fallback={null} key="auth-check">
        <AuthUtil />
      </Suspense>
      <DialogCloseBtn className="absolute right-4 top-4 rounded-sm" />
      <AddListing />
    </Dialog>
  );
};
export default ListingPage;
