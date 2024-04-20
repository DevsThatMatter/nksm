import { cn } from "@/app/utils";
import { lockDeal } from "@/lib/actions/chat.actions";
import { MessageTypes } from "@/types";
import { Button } from "../../ui/button";

interface MessageElementProps {
  queryKey: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  currentUserId: string;
  msg: MessageTypes;
}

export default function MessageElement({
  sellerId,
  buyerId,
  productId,
  currentUserId,
  msg,
}: MessageElementProps) {
  async function lockTheDeal(caller: "yes" | "no", msgId: string) {
    await lockDeal({
      seller: sellerId,
      buyer: buyerId,
      productId: productId,
      caller,
      msgId,
    });
  }

  if (msg.options) {
    return (
      <article
        className={cn(
          "mt-3 max-w-[80%] break-words rounded-lg p-3 shadow-md",
          msg.accepted === "accepted"
            ? "bg-blue-600 text-white"
            : msg.accepted === "rejected"
              ? "bg-red-100 text-red-500 dark:bg-muted"
              : "bg-[#dbe4fb] dark:bg-muted",
          msg.Sender === currentUserId ? "ml-auto" : "mr-auto",
          msg.readStatus
            ? "user-message-true"
            : msg.Sender !== currentUserId && "user-message-false",
        )}
      >
        {msg.accepted === "pending" && msg.Sender !== currentUserId ? (
          <figure className="flex flex-col items-center bg-[#dbe4fb] p-3 dark:bg-muted">
            <h4 className="text-lg font-bold text-foreground">
              Do we have a deal?
            </h4>
            <section className="mt-3 flex justify-between space-x-2">
              <Button
                onClick={() => lockTheDeal("yes", msg.msgId ?? "")}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Accept
              </Button>
              <Button
                onClick={() => lockTheDeal("no", msg.msgId ?? "")}
                className="rounded-md bg-red-100 px-4 py-2  text-red-400 hover:bg-red-200 dark:bg-background/20"
              >
                Reject
              </Button>
            </section>
          </figure>
        ) : msg.accepted === "accepted" ? (
          <h4 className=" font-semibold text-white">Deal Accepted</h4>
        ) : msg.accepted === "rejected" ? (
          <h4 className=" font-semibold text-red-400">Deal Rejected</h4>
        ) : (
          <h4 className=" font-semibold text-foreground">Deal Pending</h4>
        )}
      </article>
    );
  }
  return (
    <article
      className={cn(
        msg.readStatus
          ? "user-message-true"
          : msg.Sender !== currentUserId && "user-message-false",
        "mt-3 max-w-[80%] break-words rounded-t-3xl px-4  py-3 font-medium",
        currentUserId === msg.Sender
          ? "ml-auto rounded-l-3xl rounded-tr-3xl text-white"
          : "mr-auto rounded-r-3xl rounded-br-3xl text-black dark:text-white",
        currentUserId === msg.Sender
          ? "bg-blue-500"
          : "bg-[#dbe4fb] dark:bg-muted/80",
      )}
    >
      {msg.Message}
    </article>
  );
}
