"use client"; // Bits
import { Fragment, useEffect, useState, useRef, ElementRef } from "react";
import ChatInput from "./ChatInput";
import clsx from "clsx";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatScroll } from "@/hooks/useChatScroll";
import { useSocketMessages } from "@/hooks/useSocketMessages";
import useChatStore from "@/hooks/useChatStore";

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
  const queryKey = `chat:${productId},productId:${productId},sellerId:${sellerId},buyerId:${buyerId},query`;
  const addKey = `chat:${productId},productId:${productId},sellerId:${sellerId},buyerId:${buyerId},add`
  const updateKey = `chat:${productId},productId:${productId},sellerId:${sellerId},buyerId:${buyerId},update`
  const { removeChat } = useChatStore()

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    sellerId,
    buyerId,
    productId,
    currentUser: currentUserId,
    pageNo: 0,
  });

  // useSocketMessages({ queryKey, addKey, updateKey })

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0].items?.length ?? 0
  });



  if (productId === "" && sellerId !== "" && buyerId !== "") {
    removeChat("chatUi")
  }

  return (
    <div className=" h-[95vh] flex flex-col items-center" >
      <div className="rounded-md border border-gray-400 dark:border-gray-600 h-[90%]  relative w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {/* User display */}
        <div className="user-display z-10  py-3 px-4 flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{otherUserName}</span>
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">Seller: {sellerId === currentUserId ? "You" : otherUserName}</span>
          </div>
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">{otherUserPhoneNumber}</span>
        </div>
        {/* Messages */}
        <div className={clsx("flex flex-col flex-1 overflow-y-auto mx-auto max-w-md  h-[80%] px-2.5 pb-2")}>
          {status === "pending" ? (
            <div>Loading...</div>
          ) : status === "error" ? (
            <div>Error: Something went wrong</div>
          ) : (
            <Fragment>
              <div ref={chatRef} />
              {data?.pages.map((page, idx) => (
                <Fragment key={idx}>
                  {page.items?.map((msg, j) => (
                    <Fragment key={j}>
                      {Object.values(msg).map((it, id) =>
                        it.map((m: any, i: number) => (
                          <div
                            key={i}
                            className={`flex ${currentUserId === m.Sender ? "justify-end" : "justify-start"} mb-2`}
                          >
                            <div
                              className={clsx(
                                "max-w-[80%] text-white  rounded-lg p-2 break-words",
                                currentUserId === m.Sender ? "bg-indigo-700" : "bg-lime-500"
                              )}
                            >
                              {m.Message}
                            </div>
                          </div>
                        ))
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              ))}
              <div ref={bottomRef} />
            </Fragment>
          )}

        </div>

        {/* Input and action buttons */}
        <div className="flex items-center space-x-2 absolute bottom-0 left-0 right-0 p-2">
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
    </div>
  );
}