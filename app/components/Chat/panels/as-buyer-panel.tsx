"use client";

import { chatDetails } from "@/types";
import SellerBuyerChatDisplay from "../displays/seller-buyer-chat-display";

import { cn } from "@/app/utils";
import { getLastMessages } from "@/lib/actions/chat.actions";
import { useQueries } from "@tanstack/react-query";
import { useChatStore } from "../../../../hooks/useChatStore";
import ChatUI1 from "../messageInterface/chat-ui";
import NoOneToTalk from "../no-one-to-talk";

export default function AsBuyerPanel({
  discussions,
  userId,
  endpoint,
}: {
  userId: string;
  endpoint: "seller" | "buyer";
  discussions: { productId?: string; discussionGroup: chatDetails[] };
}) {
  const { activeDiscussion, updateLastMessage } = useChatStore();

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
            updateLastMessage(
              `seller:${sellerId}buyer:${buyerId}product:${productId}`,
              data.lastMsg?.sentBy ?? "",
              data.lastMsg?.lastSentForeignMessage ?? "",
            );
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
