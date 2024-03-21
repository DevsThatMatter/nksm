"use client";
import { Fragment, useRef, ElementRef, useEffect, useState } from "react";
import ChatInput from "./chat-input";
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
import { cn } from "@/app/utils";

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

  useEffect(() => {
    if (data?.pages?.[0]?.content?.messages) {
      setMessages(data.pages[0].content.messages);
    }
    setLockedStatus({
      status: data?.pages?.[0].content?.Locked ?? false,
      accepted: "pending",
    });
  }, [data]);

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

  console.log(
    "isFetchingNextPage => ",
    isFetchingNextPage,
    "hasNextPage => ",
    hasNextPage,
  );
  useChatScroll({
    topRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && hasNextPage,
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
    } else {
      setLockedStatus({ accepted: "rejected", status: false });
    }
  }

  const messageElements = document.querySelectorAll(".user-message-false");

  // useChatObserver({
  //   unreadMessages: messageElements,
  //   sellerId,
  //   buyerId,
  //   productId,
  //   currentUserId,
  // });

  return (
    <section className="absolute flex h-[100vh] w-[88%] flex-col items-center">
      <div className="relative h-[90%] w-full rounded-md border ">
        {/* User display */}
        <header className="user-display z-10 mb-2 flex items-center space-x-1 rounded-t-md py-3 pl-1 shadow-sm ">
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
          <span className=" font-semibold text-gray-800 dark:text-white">
            {otherUserName}
          </span>
        </header>
        {/* Messages */}
        <div
          ref={topRef}
          className={cn(
            "no-scrollbar mx-autoflex h-[72vh] max-w-md flex-1 flex-col-reverse overflow-y-auto px-2.5 pb-2",
          )}
        >
          {status === "pending" ? (
            <section className="flex flex-col space-y-3 ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((val, _) => (
                <div
                  className={cn(
                    "w-[70%] animate-pulse rounded-md bg-gray-300",
                    val % 3 === 0 ? "mr-auto" : "ml-auto",
                  )}
                >
                  <div
                    className={cn(
                      "animate-pulse rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 text-white",
                      val % 5 === 0 ? "h-16" : val % 6 === 0 ? "h-10" : "h-6",
                    )}
                  />
                </div>
              ))}
            </section>
          ) : status === "error" ? (
            <div>Error: Something went wrong</div>
          ) : (
            <Fragment>
              <section className="flex flex-col space-y-3">
                {messages?.map((msg: MessageTypes, j: number) =>
                  msg.options ? (
                    <div
                      key={j}
                      id={msg.msgId}
                      className={cn(
                        "max-w-[80%] break-words rounded-lg p-3 shadow-md",
                        msg.accepted === "accepted"
                          ? "bg-blue-600 text-white"
                          : msg.accepted === "rejected"
                            ? "bg-red-100 text-red-500"
                            : "bg-[#dbe4fb]",
                        msg.Sender === currentUserId ? "ml-auto" : "mr-auto",
                        msg.readStatus && msg.Sender !== currentUserId
                          ? "user-message-true"
                          : "user-message-false",
                      )}
                    >
                      {msg.accepted === "pending" &&
                      msg.Sender !== currentUserId ? (
                        <div className="flex flex-col bg-[#dbe4fb] p-3">
                          <h1 className="font-semibold text-black">
                            Do we have a deal?
                          </h1>
                          <div className="mt-3 flex justify-between space-x-2">
                            <Button
                              onClick={() =>
                                lockTheDeal("yes", msg.msgId ?? "")
                              }
                              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => lockTheDeal("no", msg.msgId ?? "")}
                              className="rounded-md bg-white px-4 py-2 text-black hover:bg-gray-100"
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
                        <h1 className=" font-semibold text-black">
                          Pending Deal
                        </h1>
                      )}
                    </div>
                  ) : (
                    <div
                      key={j}
                      id={msg.msgId}
                      className={cn(
                        !msg.readStatus && msg.Sender !== currentUserId
                          ? "user-message-false"
                          : "user-message-true",
                        "max-w-[80%] break-words rounded-t-3xl px-4 py-3  font-medium",
                        currentUserId === msg.Sender
                          ? "ml-auto rounded-l-3xl rounded-tr-3xl text-white"
                          : "mr-auto rounded-r-3xl rounded-br-3xl text-black dark:text-white",
                        currentUserId === msg.Sender
                          ? "bg-blue-500"
                          : "bg-[#dbe4fb] dark:bg-slate-600",
                      )}
                    >
                      {msg.Message}
                    </div>
                  ),
                )}
              </section>
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
