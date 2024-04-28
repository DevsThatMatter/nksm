import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import UserProfile from "../displays/user-profile-display";
import { useChatStore } from "../../../../hooks/useChatStore";
import { getChatDetails } from "../../../utils/chat-utils";
import { useChatQuery } from "@/hooks/useChatQuery";
import { MessageTypes } from "@/types";
import { useChatScroll } from "@/hooks/useChatScroll";
import { getMessagesResult } from "@/lib/actions/chat.actions";
import { pusherClient } from "@/lib/pusher";
import { cn } from "@/app/utils";
import MessageElement from "./message-element";
import ChatInput from "./chat-input";
import { Skeleton } from "../../ui/skeleton";
import { useChatObserver } from "@/hooks/useChatObserver";
import { useQueryClient } from "@tanstack/react-query";
import { Icons } from "@/app/utils/icons";

export default function ChatUI1({ userId }: { userId: string }) {
  const { activeDiscussion, updateLastMessage } = useChatStore();
  const productId = activeDiscussion?.productDetails.productId ?? "";
  const { queryKey, updateKey, addKey, otherUserDetails } = getChatDetails({
    userId: userId,
    activeDiscussion: activeDiscussion,
  });
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  const topRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      sellerId: activeDiscussion?.sellerDetails.id ?? "",
      buyerId: activeDiscussion?.buyerDetails.id ?? "",
      productId: activeDiscussion?.productDetails.productId ?? "",
      currentUser: userId,
    });

  useChatScroll({
    topRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && hasNextPage,
    count: messages.length,
  });

  const messageElements = document.querySelectorAll(".user-message-false");

  useChatObserver({
    unreadMessages: messageElements,
    sellerId: activeDiscussion?.sellerDetails.id ?? "",
    buyerId: activeDiscussion?.buyerDetails.id ?? "",
    productId: activeDiscussion?.productDetails.productId ?? "",
    currentUserId: userId,
  });

  useEffect(() => {
    if (data?.pages) {
      setMessages((prevMessages) => {
        let updatedMessages = [...prevMessages];
        data.pages.forEach((page) => {
          const newMessages = page?.content?.messages;
          if (newMessages) {
            const filteredNewMessages = newMessages.filter(
              (newMsg: getMessagesResult) =>
                !updatedMessages.some(
                  (prevMsg) => prevMsg.msgId === newMsg.msgId,
                ),
            );
            updatedMessages = [...updatedMessages, ...filteredNewMessages];
          }
        });
        return updatedMessages;
      });
    }
  }, [data]);

  useEffect(() => {
    pusherClient.subscribe(addKey);
    pusherClient.subscribe(updateKey);

    function newMessageHandler(message: MessageTypes) {
      setMessages((msg) => {
        return [message, ...msg];
      });
    }

    function updateMessageHandler(message: any) {
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.msgId === String(message._id)) {
            return { ...msg, accepted: message.accepted };
          } else {
            return msg;
          }
        });
      });
    }

    pusherClient.bind("messages:new", newMessageHandler);
    pusherClient.bind("messages:update", updateMessageHandler);

    return function () {
      pusherClient.unsubscribe(addKey);
      pusherClient.unsubscribe(updateKey);
      pusherClient.unbind("messages:new", newMessageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [addKey, updateKey, activeDiscussion, messages, productId]);

  return (
    <main className={cn("h-full w-full", "flex flex-col justify-between")}>
      <UserProfile otherUserDetails={otherUserDetails} />

      {/* This is the loading skeleton */}
      {status === "pending" ? (
        <section className="flex h-full flex-col justify-start px-2">
          {Array.from({ length: 13 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "mt-2 w-[70%] rounded-md",
                i % 3 === 0 ? "mr-auto" : "ml-auto",
                i % 5 === 0 ? "h-16" : i % 6 === 0 ? "h-10" : "h-6",
              )}
            />
          ))}
        </section>
      ) : status === "error" ? (
        <section className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-server-crash"
          >
            <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
            <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
            <path d="M6 6h.01" />
            <path d="M6 18h.01" />
            <path d="m13 6-4 6h6l-4 6" />
          </svg>
        </section>
      ) : (
        <div
          ref={topRef}
          className={cn(
            "mx-auto my-1 px-2.5 py-1",
            "h-full w-full",
            "flex flex-col overflow-y-auto",
          )}
        >
          {/*
                    This code (between comment) is for both visual and funtional purpose of fething new messages 
                     --------------------------------------------------------------------------------- 
                */}

          {isFetchingNextPage ? (
            <div
              className={cn(
                "flex items-center justify-center",
                "space-x-2 text-foreground",
              )}
            >
              <div
                className={cn(
                  "h-5 w-5",
                  "animate-spin rounded-full border-t-2 border-amber-400",
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5",
                    "animate-spin rounded-full border-t-2 border-lime-400",
                  )}
                />
              </div>
            </div>
          ) : (
            hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                className={cn(
                  "mx-auto my-2 px-2",
                  "rounded-md bg-muted-foreground text-sm text-background",
                )}
              >
                Load previous messages
              </button>
            )
          )}
          {/* ------------------------------------------------------------------------------------------ */}
          <Fragment>
            <section className="flex flex-col-reverse">
              {messages?.map((msg: MessageTypes) => (
                <MessageElement
                  key={msg.msgId}
                  queryKey={queryKey}
                  sellerId={activeDiscussion?.sellerDetails.id ?? ""}
                  buyerId={activeDiscussion?.buyerDetails.id ?? ""}
                  productId={activeDiscussion?.productDetails.productId ?? ""}
                  currentUserId={userId}
                  msg={msg}
                />
              ))}
            </section>
            <div ref={bottomRef} />
          </Fragment>
        </div>
      )}

      <footer>
        <ChatInput
          userId={userId}
          productId={activeDiscussion?.productDetails.productId ?? ""}
          sellerDetails={{
            id: activeDiscussion?.sellerDetails.id ?? "",
          }}
          buyerDetails={{
            id: activeDiscussion?.buyerDetails.id ?? "",
          }}
        />
      </footer>
    </main>
  );
}
