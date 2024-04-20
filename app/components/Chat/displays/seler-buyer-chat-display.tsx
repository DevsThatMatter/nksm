"use client";

import { cn } from "@/app/utils";
import { chatDetails } from "@/types";
import Image from "next/image";
import { useChatStore } from "../../../../hooks/useChatStore";
import { getChatDetails } from "../../../utils/chat-utils";
import { countUnreadMessages } from "@/lib/actions/chat.actions";
import { useQuery } from "@tanstack/react-query";

export default function SellerBuyerChatDisplay({
  discussion,
  userId,
}: {
  discussion: chatDetails;
  userId: string;
}) {
  const { displayAvatar, displayName } = getChatDetails({
    userId: userId,
    discussion: discussion,
  });
  const { setActiveDiscussion, lastMessages } = useChatStore();

  const { data } = useQuery({
    queryKey: [
      "count-unread-message",
      discussion.sellerDetails.id,
      discussion.buyerDetails.id,
      discussion.buyerDetails.id,
      userId,
    ],
    queryFn: () =>
      countUnreadMessages({
        sellerId: discussion.sellerDetails.id,
        buyerId: discussion.buyerDetails.id,
        productId: discussion.productDetails.productId,
        caller: "get",
        currentUser: userId,
      }),
  });

  return (
    <section
      className={cn(
        "p-2",
        "cursor-pointer drop-shadow-md hover:drop-shadow-lg",
        "rounded-lg border",
        "flex space-x-2 bg-muted md:space-x-4",
      )}
      onClick={() => setActiveDiscussion(discussion)}
    >
      <Image
        src={displayAvatar ?? ""}
        alt={discussion.productDetails.Product_Name}
        width={100}
        height={100}
        className="h-16 w-16 rounded-full"
      />
      <section className="flex w-full flex-col">
        <div className="flex w-full flex-row items-center justify-between">
          <h1>{displayName}</h1>
          <span
            className={cn(
              "h-5 w-5",
              "flex flex-shrink-0 items-center justify-center rounded-full text-xs",
              "bg-blue-500 text-background dark:bg-blue-700",
            )}
          >
            {data?.unreadCount}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {lastMessages?.get(discussion.productDetails.productId) ??
            "No messages yet"}
        </p>
      </section>
    </section>
  );
}
