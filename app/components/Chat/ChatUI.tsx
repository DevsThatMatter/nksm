"use client"; // Bits
import { FormEvent, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Icons } from "@/app/utils/icons";
import ChatInput from "./ChatInput";
import { SocketIOIndicator } from "./SocketIndicator";

interface ChatType {
  userName: string;
  phoneNumber: string;
  message: { msg: string; mainUser: boolean }[];
}

export default function ChatUI() {
  const initialChatMessages: ChatType = {
    userName: "John",
    phoneNumber: "123456789",
    message: [
      { msg: "Hello", mainUser: false },
      { msg: "Hello", mainUser: true },
    ],
  };

  const [chatMessages, setChatMessages] =
    useState<ChatType>(initialChatMessages);

  const [completeUserDisplay, setCompleteUserDisplay] =
    useState<boolean>(false);
  return (
    <div className="mt-10 flex h-full flex-col items-center">
      {/* just added to check if the socket connection was correctly  getting setting up */}
      <SocketIOIndicator />

      <div className="relative h-[90%] w-full max-w-md rounded-md border border-gray-300 p-4 dark:border-gray-600 md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {/* User display */}
        {!completeUserDisplay ? (
          (
            <div
              className="
                    absolute -left-4 -top-4 z-10 mb-4 flex h-10
                    w-10 cursor-pointer items-center justify-center rounded-full border 
                    bg-gray-300 p-2 transition-all hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-white"
              onClick={() => setCompleteUserDisplay(true)}
            >
              <span className="text-lg font-semibold dark:text-blue-900">
                {chatMessages.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          ) || (
            <Skeleton
              circle
              width={40}
              height={40}
              baseColor="#e2e8f0"
              highlightColor="#f7fafc"
              className="absolute -left-8 -top-8 "
            />
          )
        ) : (
          <div
            className="user-display z-10 mb-4 flex cursor-pointer items-center justify-between rounded-md border bg-gray-200 p-2 dark:bg-gray-800"
            onClick={() => setCompleteUserDisplay(false)}
          >
            <span className="text-lg font-semibold">
              {chatMessages.userName}
            </span>
            <span className="text-sm font-normal">
              {chatMessages.phoneNumber}
            </span>
          </div>
        )}

        <div className="chat-display my-auto mt-4 max-h-[90%] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {chatMessages.message.map((msg, id) => (
              <div
                key={id}
                className={`flex ${msg.mainUser ? "justify-end" : "justify-start"}`}
              >
                <div className="p-2">
                  {msg.msg ? (
                    <div
                      className={`flex max-w-md overflow-hidden rounded-bl-md rounded-br-md p-2 ${msg.mainUser ? "items-end self-end rounded-tl-md bg-green-500 text-white" : "items-start self-start rounded-tr bg-gray-300 text-black"}`}
                    >
                      <span className="break-all text-sm">{msg.msg}</span>
                      <Icons.replyIcon className="text-transparent hover:text-blue-500 group-hover:block " />
                    </div>
                  ) : (
                    <div className="flex h-6 w-40 animate-pulse items-center justify-center rounded-md bg-gray-400 p-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input and action buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-1 items-center space-x-2 p-2">
          {<ChatInput userId1={""} userId2={""} /> || (
            <Skeleton
              width={200}
              height={40}
              baseColor="#e2e8f0"
              highlightColor="#f7fafc"
            />
          )}
        </div>
      </div>
    </div>
  );
}
