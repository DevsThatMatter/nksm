"use client";
import { Fragment, useRef, ElementRef, useEffect, useState } from "react";
import ChatInput from "./chat-input";
import clsx from "clsx";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatScroll } from "@/hooks/useChatScroll";
import useChatStore from "@/hooks/useChatStore";
import { Button } from "../ui/button";
import { lockDeal } from "@/lib/actions/chat.actions";
import { MessageTypes } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { useChatObserver } from "@/hooks/useChatObserver";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "@/app/utils/icons";
import { toast } from "sonner";

interface ChatUIProps {
  currentUserId: string;
  sellerId: string;
  buyerId: string;
  otherUserId: string;
  productId: string;
  otherUserName: string;
  otherUserPhoneNumber: string;
}

export default function ChatUI({
  currentUserId,
  sellerId,
  otherUserId,
  productId,
  buyerId,
  otherUserName,
  otherUserPhoneNumber,
}: ChatUIProps) {
  const queryKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}query`;
  const addKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}add`;
  const updateKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}update`;

  const { createLockedStatus, otherUserDetails, createChat, removeChat } =
    useChatStore();

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

  useEffect(() => {
    if (data?.pages?.[0]?.content?.messages) {
      setMessages(data.pages[0].content.messages);
    }
    setLockedStatus({
      status: data?.pages?.[0].content?.Locked ?? false,
      accepted: "pending",
    });
    createLockedStatus(data?.pages?.[0].content?.Locked ?? false);
  }, [createLockedStatus, data]);

  useEffect(() => {
    pusherClient.subscribe(addKey);
    pusherClient.subscribe(updateKey);

    function newMessageHandler(message: MessageTypes) {
      setMessages((msg) => {
        return [...msg, message];
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

  useChatScroll({
    topRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: messages.length,
  });

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
      createLockedStatus(true);
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
    <section className="absolute flex h-[100vh] flex-col items-center">
      <div className="relative h-[90%] w-full rounded-md border ">
        {/* User display */}
        <header className="user-display z-10  mb-2 flex items-center space-x-1 rounded-t-md py-3 pl-1 shadow-sm ">
          {otherUserDetails.id !== "" && (
            <Button
              className="rounded-full"
              variant={"ghost"}
              size="icon"
              onClick={() => {
                if (otherUserDetails && otherUserDetails.id === "") {
                  removeChat("chatPanel");
                } else if (otherUserDetails.id !== "") {
                  removeChat("productPanel");
                }
              }}
            >
              <Icons.moveback />
            </Button>
          )}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {otherUserName}
          </span>
        </header>
        {/* Messages */}
        <div
          className={clsx(
            "no-scrollbar mx-auto flex h-[70vh] max-w-md flex-1  flex-col overflow-y-auto px-2.5 pb-2",
          )}
        >
          {status === "pending" ? (
            <div>Loading...</div>
          ) : status === "error" ? (
            <div>Error: Something went wrong</div>
          ) : (
            <Fragment>
              <div ref={topRef} />
              {messages?.map((msg: MessageTypes, j: number) => (
                <section
                  key={j}
                  className={
                    msg.options
                      ? clsx(
                          "mb-2 flex w-[80%] justify-center break-words rounded-full border-2  p-2 text-white",
                          msg.accepted === "accepted"
                            ? "border-green-300"
                            : msg.accepted == "rejected"
                              ? "border-red-300"
                              : msg.Sender === currentUserId
                                ? "ml-auto border-yellow-300"
                                : "border-yellow-300",
                        )
                      : `flex ${currentUserId === msg.Sender ? "justify-end" : "justify-start"} mb-2`
                  }
                >
                  {msg.options ? (
                    msg.accepted === "accepted" ? (
                      <div
                        id={msg.msgId}
                        className={clsx(
                          `user-message-${msg.readStatus || msg.Sender === currentUserId ? "true" : "false"}`,
                          "flex flex-col items-center space-y-2",
                        )}
                      >
                        <h1 className="text-green-500">Deal locked</h1>
                      </div>
                    ) : msg.accepted === "rejected" ? (
                      <div
                        id={msg.msgId}
                        className={clsx(
                          `user-message-${msg.readStatus || msg.Sender === currentUserId ? "true" : "false"}`,
                          "flex flex-col items-center space-y-2",
                        )}
                      >
                        <h1 className="text-red-500">Deal rejected</h1>
                      </div>
                    ) : msg.Sender === currentUserId ? (
                      <div
                        id={msg.msgId}
                        className={clsx(
                          `user-message-${msg.readStatus || msg.Sender === currentUserId ? "true" : "false"}`,
                          "flex flex-col items-center space-y-2",
                        )}
                      >
                        <h1 className="text-yellow-500">Deal pending</h1>
                      </div>
                    ) : (
                      <section className="flex items-center space-x-1">
                        <h1 className="text-yellow-500">Shall we proceed?</h1>
                        <div className="flex justify-end space-x-2">
                          <Button
                            disabled={currentUserId === msg.Sender}
                            className={
                              "rounded-full bg-green-400 hover:bg-green-500"
                            }
                            onClick={() => {
                              toast.error(
                                "This will make all your other chats for this product go stale",
                                {
                                  action: {
                                    label: "Confirm",
                                    onClick: () =>
                                      lockTheDeal("yes", msg.msgId ?? ""),
                                  },
                                },
                              );
                            }}
                          >
                            <Icons.yes />
                          </Button>
                          <Button
                            disabled={currentUserId === msg.Sender}
                            className={
                              "rounded-full bg-red-400 hover:bg-red-500"
                            }
                            onClick={() => lockTheDeal("no", msg.msgId ?? "")}
                          >
                            <Icons.no />
                          </Button>
                        </div>
                      </section>
                    )
                  ) : (
                    <div
                      id={msg.msgId}
                      className={clsx(
                        `user-message-${msg.readStatus || msg.Sender === currentUserId ? "true" : "false"}`,
                        "max-w-[80%] break-words rounded-t-lg px-3 py-2 pl-3 font-medium",
                        currentUserId === msg.Sender
                          ? "rounded-l-lg rounded-tr-lg text-white"
                          : "rounded-r-lg rounded-br-lg text-black dark:text-white",
                        currentUserId === msg.Sender
                          ? "bg-blue-500"
                          : "bg-[#dbe4fb] dark:bg-slate-600",
                      )}
                    >
                      {msg.Message}
                    </div>
                  )}
                </section>
              ))}
              <div ref={bottomRef} />
            </Fragment>
          )}
        </div>
        {/* Input and action buttons */}
        <div className="absolute bottom-0 flex-1 p-1">
          <ChatInput
            otherUserPhoneNumber={otherUserPhoneNumber}
            userId={currentUserId}
            productId={productId}
            otherUserId={otherUserId}
            otherUserName={otherUserName}
            sellerDetails={{ id: sellerId }}
            buyerDetails={{ id: buyerId }}
          />
        </div>
      </div>
    </section>
  );
}
