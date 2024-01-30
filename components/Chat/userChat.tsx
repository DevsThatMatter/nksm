"use client";
// bits

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import useChatStore from "../../Hooks/chatStore";
import ChatUI from "./ChatUI";
import { Icons } from "@/app/ui/icons";
import { useEffect, useState } from "react";
import { ChatDetails, getAllPrevChats } from "../../lib/actions/chat.actions";
import { Chat } from "@/lib/models/interfaces";
import Image from "next/image";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

export type transferData = {
    productId: string,
    sellerPhone: string,
    buyerPhone: string
}

export default function UserChat() {
    const chat = useChatStore((state) => state.chat);
    const createChat = useChatStore((state) => state.createChat);
    const removeChat = useChatStore((state) => state.removeChat);
    const [userData, setUserData] = useState<transferData | null>(null)

    function handleSetChat(data: transferData) {
        try {
            if (!data) {
                throw new Error("Unable to set this chat");
            }
            createChat({
                ...data
            });
        } catch (error) {
            console.error(error);
        }
    }

    const [allPrevChats, setAllPrevChats] = useState<ChatDetails[] | null>(null);
    // <TODO : calling component>  this user Id needs to be passed from the calling component
    const userId = "65b533afa47477aa438a88c6";

    async function fetchData() {
        try {
            const data = await getAllPrevChats(userId);
            if (data !== undefined) {
                console.log(data);
                setAllPrevChats(data);
            } else {
                console.error("Data is undefined");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            fetchData();
                        }}
                    >
                        <Icons.chaticon className="w-[1.32rem] h-[1.3rem]" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>
                            {chat.productId === "" ? (
                                allPrevChats === null || allPrevChats.length === 0 ? (
                                    <span>You found no one to talk with?</span>
                                ) : (
                                    <span>Lets have some chats...</span>
                                )
                            ) : (
                                <Button
                                    className="-left-4"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => {
                                        removeChat();
                                    }}
                                >
                                    <Icons.moveback />
                                </Button>
                            )}
                        </SheetTitle>
                    </SheetHeader>
                    {chat.productId === "" ? (
                        <SheetDescription className="mt-4 flex flex-col space-y-4 w-full">
                            {allPrevChats !== null && allPrevChats.length > 0 ? (
                                allPrevChats.map((prevChat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-2 border rounded-md shadow-md cursor-pointer hover:shadow-xl"
                                        onClick={() => handleSetChat({ productId: prevChat.ProductDetails.id, sellerPhone: prevChat.SellerDetails.phone_no, buyerPhone: prevChat.BuyerDetails.phone_no })}
                                    >
                                        <div className="flex flex-1 items-center justify-between">
                                            <div className="flex flex-col">
                                                <p className="text-lg font-medium text-gray-800">
                                                    {prevChat.ProductDetails.productName || <Skeleton baseColor='#e2e8f0' highlightColor='#f7fafc' />}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {prevChat.BuyerDetails.id === userId
                                                        ? `Sold by: ${prevChat.SellerDetails.first_name || <Skeleton baseColor='#e2e8f0' highlightColor='#f7fafc' />} ${prevChat.SellerDetails.last_name || <Skeleton baseColor='#e2e8f0' highlightColor='#f7fafc' />}`
                                                        : `Bought by: ${prevChat.BuyerDetails.first_name || <Skeleton baseColor='#e2e8f0' highlightColor='#f7fafc' />} ${prevChat.BuyerDetails.last_name || <Skeleton baseColor='#e2e8f0' highlightColor='#f7fafc' />}`}
                                                </p>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full shadow-md ${prevChat.ProductDetails.currentUserStatus === "Seller"
                                                ? "bg-blue-400"
                                                : "bg-lime-400"
                                                }`}
                                            />
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="relative my-[50%] flex flex-col justify-center items-center space-y-4">
                                    <Image
                                        src={"/monoUseImages/noWork.png"}
                                        alt="Empty chat"
                                        width={300}
                                        height={300}
                                    />
                                    <h1 className="text-gray-500 text-lg">
                                        {" "}
                                        No Current product disscussions
                                    </h1>
                                </div>
                            )}
                        </SheetDescription>
                    ) : (
                        <ChatUI />
                    )}
                </SheetContent>
            </Sheet>
        </div >
    );
}
