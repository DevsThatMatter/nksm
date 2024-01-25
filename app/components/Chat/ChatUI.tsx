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
    <div className="mt-10 h-full flex flex-col items-center">
      {/* just added to check if the socket connection was correctly  getting setting up */}
      <SocketIOIndicator />

      <div className="rounded-md border border-gray-300 dark:border-gray-600 h-[90%] p-4 relative w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {/* User display */}
        {!completeUserDisplay ? (
          (
            <div
              className="
                    z-10 w-10 h-10 p-2 mb-4 border rounded-full
                    flex items-center justify-center absolute -top-4 -left-4 
                    bg-gray-300 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-white transition-all cursor-pointer"
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
              className="absolute -top-8 -left-8 "
            />
          )
        ) : (
          <div
            className="user-display z-10 border p-2 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-between mb-4 cursor-pointer"
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

        <div className="chat-display overflow-y-auto mt-4 max-h-[90%] my-auto">
          <div className="flex flex-col space-y-4">
            {chatMessages.message.map((msg, id) => (
              <div
                key={id}
                className={`flex ${msg.mainUser ? "justify-end" : "justify-start"}`}
              >
                <div className="p-2">
                  {msg.msg ? (
                    <div
                      className={`max-w-md rounded-bl-md rounded-br-md p-2 overflow-hidden flex ${msg.mainUser ? "bg-green-500 rounded-tl-md text-white self-end items-end" : "bg-gray-300 rounded-tr text-black self-start items-start"}`}
                    >
                      <span className="text-sm break-all">{msg.msg}</span>
                      <Icons.replyIcon className="text-transparent group-hover:block hover:text-blue-500 " />
                    </div>
                  ) : (
                    <div className="bg-gray-400 animate-pulse p-4 rounded-md h-6 w-40 items-center flex justify-center" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input and action buttons */}
        <div className="flex flex-1 items-center space-x-2 absolute bottom-0 left-0 right-0 p-2">
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
