import { acceptTheInvite } from "@/lib/actions/chat.actions";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { cn } from "@/app/utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "@/hooks/useChatStore";

export default function InviteModal({
  endpoint,
  productId,
  sellerId,
  buyerId,
  userId,
}: {
  productId: string;
  sellerId: string;
  buyerId: string;
  userId: string;
  endpoint: "Accept" | "Reject";
}) {
  const queryClient = useQueryClient();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "rounded-lg px-3 py-1 text-sm font-semibold",
            endpoint === "Accept"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-red-100 text-red-500 hover:text-red-600 dark:bg-background/30",
          )}
        >
          {endpoint}
        </button>
      </DialogTrigger>
      <CustomDialogContent
        userId={userId}
        endpoint={endpoint}
        productId={productId}
        sellerId={sellerId}
        buyerId={buyerId}
      />
    </Dialog>
  );
}

function CustomDialogContent({
  endpoint,
  productId,
  sellerId,
  buyerId,
  userId,
}: {
  productId: string;
  sellerId: string;
  buyerId: string;
  userId: string;
  endpoint: "Accept" | "Reject";
}) {
  const queryClient = useQueryClient();
  function handelMainAction() {
    const prom = acceptTheInvite({
      productId: productId,
      sellerId: sellerId,
      buyerId: buyerId,
      caller: endpoint === "Accept" ? "accept" : "reject",
    });
    toast.promise(prom, {
      loading: endpoint === "Accept" ? "Accepting..." : "Rejecting...",
      success: endpoint === "Accept" ? "Invite accepted." : "Invite rejected",
      error:
        endpoint === "Accept"
          ? "Unable to Accept the invite."
          : "Unable to Reject the invite.",
    });
  }

  return (
    <DialogContent className="flex flex-col space-y-4">
      <DialogTitle
        className={cn(
          "rounded-t-lg px-4 py-3 text-center text-white",
          endpoint === "Reject" ? "bg-red-600" : "bg-blue-600",
        )}
      >
        {endpoint} this invite?
      </DialogTitle>
      <section className="flex flex-col space-y-4">
        <section aria-live="polite">
          <h1 className="font-semibold text-yellow-400 md:text-lg">
            Confirmation Required:
          </h1>
          <p className="ml-5 text-muted-foreground" id="warning-text">
            This action will {endpoint === "Accept" ? "accept" : "reject"} the
            invite. Are you sure you want to proceed?
          </p>
        </section>
        <section className="flex justify-end">
          <DialogClose asChild>
            <Button
              className={cn(
                "mr-2",
                endpoint === "Reject"
                  ? "bg-red-600 hover:bg-red-600"
                  : "bg-blue-600",
              )}
              onClick={() => handelMainAction()}
              aria-describedby="warning-text"
            >
              {endpoint}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="border border-red-500 bg-transparent text-red-400 hover:bg-transparent"
              onClick={() => toast.info("No changes made")}
              aria-label="Close Dialog"
            >
              Cancel
            </Button>
          </DialogClose>
        </section>
      </section>
    </DialogContent>
  );
}
