"use client"; // Bits
import { Fragment, useEffect, useState, useRef, ElementRef } from "react";
import ChatInput from "./ChatInput";
import clsx from "clsx";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatScroll } from "@/hooks/useChatScroll";
import { useSocketMessages } from "@/hooks/useSocketMessages";

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

  const [completeUserDisplay, setCompleteUserDisplay] = useState<boolean>(false);

  return (
    <div className="mt-5 h-[95vh] flex flex-col items-center" >
      <div className="rounded-md border border-gray-400 dark:border-gray-600 h-[90%] p-4 relative w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {/* User display */}
        {!completeUserDisplay ? (
          <div
            className="
              z-10 w-10 h-10 p-2 mb-4 border rounded-full
              flex items-center justify-center absolute -top-4 -left-4 
              bg-gray-300 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-white transition-all cursor-pointer"
            onClick={() => setCompleteUserDisplay(true)}
          >
            <span className="text-lg font-semibold dark:text-blue-900">{otherUserName.charAt(0).toUpperCase()}</span>
          </div>
        ) : (
          <div
            className="user-display z-10 border p-2 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => setCompleteUserDisplay(false)}
          >
            <span className="text-lg font-semibold">{otherUserName}</span>
            <span className="text-sm font-normal">{otherUserPhoneNumber}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col flex-1 overflow-y-auto mx-auto max-w-md h-[90%]">
          {status === "pending" ? (
            <div>Loading...</div>
          ) : status === "error" ? (
            <div>Error: Something went wrong</div>
          ) : (
            <Fragment>
              <div ref={chatRef}/>
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
                                "max-w-[80%] text-white rounded-lg p-2 break-words",
                                currentUserId === m.Sender ? "bg-blue-700" : "bg-pink-600"
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
              <div ref={bottomRef}/>
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