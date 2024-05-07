import { cn } from "@/app/utils";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { toast } from "sonner";
import { handelDeleteChat } from "@/lib/actions/chat.actions";
import { useChatStore } from "@/hooks/useChatStore";

export default function DeleteChat({
  Seller,
  Buyer,
  ProductId,
}: {
  Seller: string;
  Buyer: string;
  ProductId: string;
}) {
  const { removeDiscussionGroup, removeActiveDiscussion, isLocked } =
    useChatStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-3 bg-red-500 hover:bg-red-600">
          Delete chat
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col space-y-4">
        <DialogTitle
          className={cn(
            "rounded-t-lg px-4 py-3 text-center text-white",
            "bg-red-600",
          )}
        >
          Delete this chat?
        </DialogTitle>
        <section className="flex flex-col space-y-4">
          <section aria-live="polite">
            <h1 className="font-semibold text-yellow-400 md:text-lg">
              Confirmation Required:
            </h1>
            <p className="ml-5 text-muted-foreground" id="warning-text">
              This action will delete the current chat. Are you sure you want to
              proceed?
            </p>
          </section>
          <section className="flex justify-end">
            <DialogClose asChild>
              <Button
                className={cn("mr-2", "bg-red-600 hover:bg-red-600")}
                onClick={async () => {
                  const prom = handelDeleteChat({ Seller, Buyer, ProductId });
                  toast.promise(prom, {
                    loading: "Deleting chat.",
                    success: (data: void) => {
                      removeActiveDiscussion();
                      removeDiscussionGroup();
                      return "Deleted.";
                    },
                  });
                }}
                aria-describedby="warning-text"
              >
                Delete chat
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
    </Dialog>
  );
}
