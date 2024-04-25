"use client";

import SellerBuyerChatDisplay from "../displays/seler-buyer-chat-display";
import { chatDetails } from "@/types";

import ChatUI1 from "../messageInterface/chat-ui";
import NoOneToTalk from "../no-one-to-talk";
import { cn } from "@/app/utils";
import { useQueries } from "@tanstack/react-query";
import { getLastMessages } from "@/lib/actions/chat.actions";
import { useEffect } from "react";
import ProductDisplay from "../displays/product-display";
import { useChatStore } from "../../../../hooks/useChatStore";

export default function AsBuyerPanel({
  discussions,
  userId,
  endpoint,
}: {
  userId: string;
  endpoint: "seller" | "buyer";
  discussions: { productId?: string; discussionGroup: chatDetails[] };
}) {
  const { activeDiscussion, updateLastMessage, activeDiscussionGroup } =
    useChatStore();

  useQueries({
    queries: discussions.discussionGroup.map((chat) => {
      const sellerId = chat.sellerDetails.id;
      const buyerId = chat.buyerDetails.id;
      const productId = String(chat.productDetails.productId);

      return {
        queryKey: [`last-message`, sellerId, buyerId, productId],
        queryFn: () =>
          getLastMessages({
            sellerId: sellerId,
            buyerId: buyerId,
            productId: productId,
          }).then((data) => {
            updateLastMessage(productId, data.lastMsg ?? "");
            return data;
          }),
      };
    }),
  });

  if (discussions.discussionGroup.length === 0) {
    return <NoOneToTalk endpoint={"buyer"} />;
  }

  return (
    <main className="h-full">
      {!activeDiscussion ? (
        <>
          {endpoint === "seller" && activeDiscussionGroup && (
            <ProductDisplay productId={activeDiscussionGroup.productId} />
          )}
          <ul
            className={cn(
              "h-full",
              "px-4 pt-2",
              "flex flex-col space-y-3 overflow-y-auto",
            )}
          >
            {discussions.discussionGroup.map((discussion, idx) => (
              <li key={idx}>
                <SellerBuyerChatDisplay
                  discussion={discussion}
                  userId={userId}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ChatUI1 userId={userId} />
      )}
    </main>
  );
}
