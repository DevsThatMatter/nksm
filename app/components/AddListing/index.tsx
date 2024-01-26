import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

export function AddListing() {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="relative">
          <Icons.add className="absolute  left-2 m-auto top-0 bottom-0 h-5 w-5" />
          <span className="hidden sm:inline-block pl-4"> Add Listing </span>
        </Button>
      </DialogTrigger>
      <div className="grid gap-4">

      <DialogContent className="l:max-w-[800px] h-[600px] grid gap-5">
          <DialogHeader>

            <div> 

              step 1 of 4.</div>
            <DialogTitle>Add Listing</DialogTitle>
            <DialogDescription>
              Provide details for your new listing.
            </DialogDescription>
          </DialogHeader>
            
            
          <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-lg shadow-2xl">
            <StepTwo />
          </div>

          


          <DialogFooter className="flex justify-end mt-auto">
            <Button type="submit">
              Next
            </Button> 
          
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
