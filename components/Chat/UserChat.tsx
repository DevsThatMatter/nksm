"use client"
// bits

import React, { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import useChatStore from "../../Hooks/chatStore";
import ChatUI from "./ChatUI";

interface Chat {
    name: string;
    phoneNumber: string;
}

export default function UserChat() {
    const chat = useChatStore((state) => state.chat)
    const createChat = useChatStore((state) => state.createChat);
    const removeChat = useChatStore((state) => state.removeChat)
    function handleSetChat(phoneNumber: string) {
        try {
            if (!phoneNumber) {
                throw new Error("Unable to set this chat");
            }
            createChat({
                phoneNumber,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Dummy data
    const chats: Chat[] = [{ name: "Bits", phoneNumber: "+91-1234567800" }];

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild >
                    <Button variant="ghost">
                        <ChatBubbleIcon />
                    </Button>
                </SheetTrigger>
                {chats ? (
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>
                                {chat === "" ? (
                                    <span>Lets have some chats...</span>
                                ) : (
                                    <Button
                                        className="-left-4"
                                        size={"icon"}
                                        variant="ghost"
                                        onClick={() => {
                                            removeChat();
                                        }}
                                    >
                                        <ArrowLeftIcon />
                                    </Button>
                                )}
                            </SheetTitle>
                        </SheetHeader>
                        {chat === "" ? (
                            <SheetDescription className="mt-4 flex flex-col space-y-4 w-full">
                                {chats.map((chat) => (
                                    <div
                                        key={chat.phoneNumber}
                                        className="flex items-center justify-between p-2 border rounded-md shadow-md cursor-pointer hover:shadow-xl"
                                        onClick={() => handleSetChat(chat.phoneNumber)}
                                    >
                                        <div>
                                            <h1 className="text-lg font-bold">{chat.name}</h1>
                                            <p className="text-md font-medium">{chat.phoneNumber}</p>
                                        </div>
                                        {/* Add any additional information like last message or online status here */}
                                    </div>
                                ))}
                            </SheetDescription>
                        ) : (
                            <ChatUI />
                        )}
                    </SheetContent>
                ) : (
                    <div>{/* UI for no chats */}</div>
                )}
            </Sheet>
        </div>

    );
}
