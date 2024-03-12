import { AddListing } from "@/app/components/AddListing";
import { Dialog } from "@/app/components/Dialog";
import { DialogContent } from "@/app/components/ui/dialog";
import { Textarea } from "@/app/components/ui/textarea";

const ListingPage = () => {
  console.log("add");
  return (
    <Dialog>
      <AddListing />
    </Dialog>
  );
};
export default ListingPage;
