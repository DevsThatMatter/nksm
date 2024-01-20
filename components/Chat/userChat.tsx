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
import useChatStore from "./store";
import ChatUI from "./ChatUI";
import { Icons } from "@/app/ui/icons";

interface Chat {
    name: string;
    phoneNumber: string;
}

export default function UserChat() {
    const chat = useChatStore((state) => state.chat)
    const createChat = useChatStore((state) => state.createChat);

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
                <SheetTrigger>
                    <Button variant="ghost">
                        <Icons.chaticon className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                {/* if there are some sellers/buyers the current user is having chat with, then only we render the content */}
                {chats ? (
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Lets have some chats...</SheetTitle>
                        </SheetHeader>
                        {
                            chat === "" ? (
                                <SheetDescription className="mt-20 flex flex-col space-y-4 w-60">
                                    {chats.map((chat) => (
                                        <div
                                            key={chat.phoneNumber}
                                            className="flex flex-1 justify-between p-2 border rounded-md shadow-md cursor-pointer hover:shadow-xl"
                                            onClick={() => handleSetChat(chat.phoneNumber)}
                                        >
                                            <h1 className="text-lg font-bold ">{chat.name}</h1>
                                            <p className="text-md font-medium ">{chat.phoneNumber}</p>
                                        </div>
                                    ))}
                                </SheetDescription>
                            ) : (
                                <ChatUI />
                            )
                        }
                    </SheetContent>
                ) : (
                    <div>
                        {/* ui for no chats */}
                    </div>
                )}
            </Sheet>
        </div>
    );
}
