import { countUnreadMessages } from "@/lib/actions/chat.actions";
import { useEffect } from "react";

export const useChatObserver = ({
  unreadMessages,
  sellerId,
  buyerId,
  productId,
  currentUserId
}: {
  unreadMessages: NodeListOf<Element>;
  sellerId: string;
  buyerId: string;
  productId: string;
  currentUserId: string
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const messageId = entry.target.id
          try {
            await countUnreadMessages({
              productId,
              sellerId,
              buyerId,
              messageId,
              caller: "update",
              currentUser: currentUserId
            });
          } catch (error) {
            console.error("Error counting unread messages:", error);
          } finally {
            observer.unobserve(entry.target);
          }

        }
      });
    }, {
      threshold: 1
    });

    unreadMessages.forEach((msg) => {
      observer.observe(msg);
    });

    return () => {
      observer.disconnect();
    };
  }, [unreadMessages, sellerId, buyerId, productId, currentUserId]);
};
