"use client";

import { cn } from "@/app/utils";
import { countUnreadMessages } from "@/lib/actions/chat.actions";
import { pusherClient } from "@/lib/pusher";
import { chatDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useChatStore } from "../../../../hooks/useChatStore";
import { getChatDetails } from "../../../utils/chat-utils";
import { Skeleton } from "../../ui/skeleton";

export default function SellerBuyerChatDisplay({
  discussion,
  userId,
}: {
  discussion: chatDetails;
  userId: string;
}) {
  const { displayAvatar, displayName, unreadMessageChannelKey, addKey } =
    getChatDetails({
      userId: userId,
      discussion: discussion,
    });
  const { setActiveDiscussion, lastMessages } = useChatStore();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { data } = useQuery({
    queryKey: [
      "count-unread-message",
      discussion.sellerDetails.id,
      discussion.buyerDetails.id,
      discussion.productDetails.productId,
      userId,
    ],
    queryFn: () =>
      countUnreadMessages({
        sellerId: discussion.sellerDetails.id,
        buyerId: discussion.buyerDetails.id,
        productId: discussion.productDetails.productId,
        caller: "get",
        currentUser: userId,
      }).then((data) => {
        setUnreadCount(data);
        return data;
      }),
  });

  useEffect(() => {
    pusherClient.subscribe(unreadMessageChannelKey);
    pusherClient.subscribe(addKey);

    function handelUpdatedUnreadCount(count: number) {
      console.log("count => ", count);
      setUnreadCount(count);
    }
    function handelUpdatedLastMessage(count: number) {
      console.log("count => ", count);
      setUnreadCount(count);
    }

    pusherClient.bind("unreadCount:inc", handelUpdatedUnreadCount);
    pusherClient.bind("lastMessage:new", handelUpdatedLastMessage);

    return () => {
      pusherClient.unsubscribe(unreadMessageChannelKey);
      pusherClient.unbind("unreadCount:inc", handelUpdatedUnreadCount);
    };
  });

  const messageSender =
    userId === lastMessages?.get(discussion.productDetails.productId)?.[0]
      ? "You"
      : "Them";

  const lastMessage = lastMessages?.get(
    discussion.productDetails.productId,
  )?.[1];

  const messageContent =
    lastMessage !== undefined ? (
      lastMessage
    ) : (
      <Skeleton className="h-full w-32" />
    );

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
      {(
        <Image
          src={displayAvatar ?? ""}
          alt={discussion.productDetails.Product_Name}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full"
        />
      ) || <Skeleton className="h-16 w-20 rounded-full" />}
      <section className="flex w-full flex-col space-y-2 pl-2">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col space-y-0">
            <h1 className="line-clamp-1 text-lg font-semibold">
              {displayName || <Skeleton className="h-3 w-32" />}
            </h1>
            <h4 className="m-0 line-clamp-1 p-0 text-sm text-muted-foreground">
              For: {discussion.productDetails.Product_Name}
            </h4>
            <span className="line-clamp-1 flex h-4 text-xs text-muted-foreground">
              {messageContent && <p>{messageSender}:&nbsp;&nbsp;</p>}
              <p>{messageContent}</p>
            </span>
          </div>
          {data !== 0 && (
            <span
              className={cn(
                "h-4 w-4",
                "flex flex-shrink-0 items-center justify-center rounded-full text-sm",
                "bg-blue-500 font-semibold text-white dark:bg-blue-700",
              )}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </section>
    </section>
  );
}
