"use client";
import { Fragment, useRef, ElementRef, useEffect, useState } from "react";
import ChatInput from "./chat-input";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatScroll } from "@/hooks/useChatScroll";
import useChatStore from "@/hooks/useChatStore";
import { Button } from "../ui/button";
import { getMessagesResult, lockDeal } from "@/lib/actions/chat.actions";
import { MessageTypes } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { useChatObserver } from "@/hooks/useChatObserver";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "@/app/utils/icons";
import { cn } from "@/app/utils";
import { Icon } from "@radix-ui/react-select";

interface ChatUIProps {
  currentUserId: string;
  sellerId: string;
  buyerId: string;
  otherUserId: string;
  productId: string;
  otherUserName: string;
  otherUserPhoneNumber: string;
  avatar: string;
}

export default function ChatUI({
  currentUserId,
  sellerId,
  otherUserId,
  productId,
  buyerId,
  otherUserName,
  otherUserPhoneNumber,
  avatar,
}: ChatUIProps) {
  const queryKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}query`;
  const addKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}add`;
  const updateKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}update`;

  const { otherUserDetails, createChat, removeChat } = useChatStore();

  const topRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const [lockedStatus, setLockedStatus] = useState<{
    status: boolean;
    accepted: "pending" | "accepted" | "rejected";
  }>({ status: false, accepted: "pending" });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      sellerId,
      buyerId,
      productId,
      currentUser: currentUserId,
      pageNo: 0,
    });
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  useChatScroll({
    topRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && hasNextPage,
    count: messages.length,
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
    setLockedStatus({
      status: data?.pages?.[0]?.content?.Locked ?? false,
      accepted: "pending",
    });
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
  }, [addKey, updateKey, productId, sellerId, buyerId, messages]);

  if (productId === "" && sellerId !== "" && buyerId !== "") {
    removeChat("chatUi");
  }

  async function lockTheDeal(caller: "yes" | "no", msgId: string) {
    await lockDeal({
      seller: sellerId,
      buyer: buyerId,
      productId: productId,
      caller,
      msgId,
    });
    if (caller === "yes") {
      setLockedStatus({ accepted: "accepted", status: true });
    } else {
      setLockedStatus({ accepted: "rejected", status: false });
    }
  }

  const messageElements = document.querySelectorAll(".user-message-false");

  useChatObserver({
    unreadMessages: messageElements,
    sellerId,
    buyerId,
    productId,
    currentUserId,
  });

  return (
    <section className="items-centerjustify-between flex h-full w-full flex-col">
      {/* User display */}
      <header className="flex w-full items-center space-x-3 bg-muted py-3 pl-2 shadow-sm">
        {otherUserDetails.id !== "" && (
          <button
            className="rounded-full"
            onClick={() => {
              if (otherUserDetails && otherUserDetails.id === "") {
                removeChat("chatPanel");
              } else if (otherUserDetails.id !== "") {
                removeChat("productPanel");
              }
            }}
          >
            <Icons.moveback className="h-6 w-6" />
          </button>
        )}
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{otherUserName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start">
          <span className="font-semibold text-foreground">{otherUserName}</span>
          <span className="text-sm text-muted-foreground">
            {otherUserPhoneNumber}
          </span>
        </div>
      </header>
      {/* Messages */}
      {status === "pending" ? (
        <section className="flex flex-col space-y-3 ">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-[70%] animate-pulse rounded-md bg-gray-300",
                i % 3 === 0 ? "mr-auto" : "ml-auto",
              )}
            >
              <div
                className={cn(
                  "animate-pulse rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 text-white",
                  i % 5 === 0 ? "h-16" : i % 6 === 0 ? "h-10" : "h-6",
                )}
              />
            </div>
          ))}
        </section>
      ) : status === "error" ? (
        <div>Error: Something went wrong</div>
      ) : (
        <div
          ref={topRef}
          className={
            "mx-auto my-1 flex h-full w-full flex-col overflow-y-auto px-2.5 py-1"
          }
        >
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300">
              <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-lime-700" />
              <h4 className="text-sm font-medium">Loading...</h4>
            </div>
          ) : (
            hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                className="mx-auto my-2 rounded-md bg-gray-300 px-2 text-sm text-gray-600 transition hover:bg-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-zinc-300"
              >
                Load previous messages
              </button>
            )
          )}

          <Fragment>
            <section className="flex flex-col-reverse ">
              {messages?.map((msg: MessageTypes, j: number) =>
                msg.options ? (
                  <div
                    key={j}
                    id={msg.msgId}
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
                    {msg.accepted === "pending" &&
                    msg.Sender !== currentUserId ? (
                      <div className="flex flex-col items-center bg-[#dbe4fb] p-3 dark:bg-muted">
                        <h1 className="text-lg font-bold text-foreground">
                          Do we have a deal?
                        </h1>
                        <div className="mt-3 flex justify-between space-x-2">
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
                        </div>
                      </div>
                    ) : msg.accepted === "accepted" ? (
                      <h1 className=" font-semibold text-white">
                        Deal Accepted
                      </h1>
                    ) : msg.accepted === "rejected" ? (
                      <h1 className=" font-semibold text-red-400">
                        Deal Rejected
                      </h1>
                    ) : (
                      <h1 className=" font-semibold text-foreground">
                        Deal Pending
                      </h1>
                    )}
                  </div>
                ) : (
                  <div
                    key={j}
                    id={msg.msgId}
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
                  </div>
                ),
              )}
            </section>
            <div ref={bottomRef} />
          </Fragment>
        </div>
      )}

      <ChatInput
        otherUserPhoneNumber={otherUserPhoneNumber}
        userId={currentUserId}
        productId={productId}
        otherUserId={otherUserId}
        otherUserName={otherUserName}
        sellerDetails={{ id: sellerId }}
        buyerDetails={{ id: buyerId }}
      />
    </section>
  );
}
