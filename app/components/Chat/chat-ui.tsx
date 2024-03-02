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
  const addKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}add`
  const updateKey = `chat${productId}productId${productId}sellerId${sellerId}buyerId${buyerId}update`
  const { removeChat, createLockedStatus } = useChatStore()

  const topRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const [lockedStatus, setLockedStatus] = useState<{ status: boolean, accepted: "pending" | "accepted" | "rejected" }>({ status: false, accepted: "pending" })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    sellerId,
    buyerId,
    productId,
    currentUser: currentUserId,
    pageNo: 0,
  });
  const [messages, setMessages] = useState<MessageTypes[]>([])

  useEffect(() => {
    if (data?.pages?.[0]?.content?.messages) {
      setMessages(data.pages[0].content.messages);
    }
    setLockedStatus({ status: data?.pages?.[0].content?.Locked ?? false, accepted: "pending" })
    createLockedStatus(data?.pages?.[0].content?.Locked ?? false)
  }, [createLockedStatus, data]);


  useEffect(() => {
    pusherClient.subscribe(addKey)
    pusherClient.subscribe(updateKey)

    function newMessageHandler(message: MessageTypes) {
      setMessages((msg) => {
        return [...msg, message]
      })
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

    pusherClient.bind("messages:new", newMessageHandler)
    pusherClient.bind("messages:update", updateMessageHandler)

    return function () {
      pusherClient.unsubscribe(addKey)
      pusherClient.unsubscribe(updateKey)
      pusherClient.unbind("messages:new", newMessageHandler)
      pusherClient.unbind("messages:update", updateMessageHandler)
    }
  }, [addKey, updateKey, productId, sellerId, buyerId, messages])



  useChatScroll({
    topRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: messages.length
  });


  if (productId === "" && sellerId !== "" && buyerId !== "") {
    removeChat("chatUi")
  }

  async function lockTheDeal(caller: "yes" | "no", msgId: string) {
    await lockDeal({ seller: sellerId, buyer: buyerId, productId: productId, caller, msgId });
    if (caller === "yes") {
      setLockedStatus({ accepted: "accepted", status: true })
      createLockedStatus(true)
    } else {
      setLockedStatus({ accepted: "rejected", status: false })
    }
  }

  const messageElements = document.querySelectorAll('.user-message-false');

  useChatObserver({ unreadMessages: messageElements, sellerId, buyerId, productId, currentUserId })

  return (
    <div className=" h-[95vh] flex flex-col items-center" >
      <div className="rounded-md border border-gray-400 dark:border-gray-600 h-[90%]  relative w-full">
        {/* User display */}
        <div className="user-display z-10  py-3 px-4 flex items-center justify-between mb-2 bg-gray-200 dark:bg-gray-600 rounded-t-md">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{otherUserName}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{otherUserPhoneNumber}</span>
          </div>
        </div>
        {/* Messages */}
        <div className={clsx("flex flex-col flex-1 overflow-y-auto mx-auto max-w-md  h-[76.5%] px-2.5 pb-2")}>

          {status === "pending" ? (
            <div>Loading...</div>
          ) : status === "error" ? (
            <div>Error: Something went wrong</div>
          ) : (
            <Fragment>
              <div ref={topRef} />
              {
                messages?.map((msg: MessageTypes, j: number) => (
                  <section
                    key={j}
                    className={msg.options ? clsx(
                      "flex justify-center w-[60%] text-white rounded-lg p-2 break-words border-2 mb-2",
                      msg.accepted === "accepted" ? "border-lime-300" : msg.accepted == "rejected" ? "border-red-300" : msg.Sender === currentUserId ? "border-blue-500 ml-auto" : "border-blue-400"
                    ) : `flex ${currentUserId === msg.Sender ? "justify-end" : "justify-start"} mb-2`}
                  >
                    {
                      msg.options ? (
                        msg.accepted === "accepted" ? (
                          <div id={msg.msgId} className={clsx(`user-message-${(msg.readStatus || msg.Sender === currentUserId) ? "true" : "false"}`, "flex flex-col space-y-2 items-center")}>
                            <h1 className="text-lime-300">Deal locked</h1>
                          </div>
                        ) : msg.accepted === "rejected" ? (
                          <div id={msg.msgId} className={clsx(`user-message-${(msg.readStatus || msg.Sender === currentUserId) ? "true" : "false"}`, "flex flex-col space-y-2 items-center")}>
                            <h1 className="text-red-300">Deal rejected</h1>
                          </div>
                        ) : (
                          msg.Sender === currentUserId ? (
                            <div id={msg.msgId} className={clsx(`user-message-${(msg.readStatus || msg.Sender === currentUserId) ? "true" : "false"}`, "flex flex-col space-y-2 items-center")}>
                              <h1 className="text-blue-500">Deal pending</h1>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center space-y-1">
                              <h1 className="text-blue-400">Do we have a deal?</h1>
                              <div className="flex space-x-2 justify-end">
                                <Button
                                  disabled={currentUserId === msg.Sender}
                                  className={"bg-blue-400 hover:bg-sky-400"}
                                  onClick={() => lockTheDeal("yes", (msg.msgId ?? ""))}
                                >
                                  {"Yes"}
                                </Button>
                                <Button
                                  disabled={currentUserId === msg.Sender}
                                  className={"bg-blue-400 hover:bg-sky-400"}
                                  onClick={() => lockTheDeal("no", (msg.msgId ?? ""))}
                                >
                                  {"No"}
                                </Button>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div
                          id={msg.msgId}
                          className={clsx(
                            `user-message-${(msg.readStatus || msg.Sender === currentUserId) ? "true" : "false"}`,
                            "max-w-[80%] text-white px-2 py-1 break-words rounded-t-full",
                            currentUserId === msg.Sender ? "rounded-l-full rounded-tr-full" : "rounded-r-full rounded-br-full text-black",
                            currentUserId === msg.Sender ? "bg-blue-500" : "bg-sky-200 "
                          )}
                        >
                          {msg.Message}
                        </div>
                      )
                    }
                  </section>
                ))
              }
              <div ref={bottomRef} />
            </Fragment>
          )}
        </div>
        {/* Input and action buttons */}
        <div className="absolute bottom-0 p-1 flex-1">
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
    </div >
  );
}