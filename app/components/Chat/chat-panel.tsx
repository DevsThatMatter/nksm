"use client";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Tabs, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { chatDetails } from "@/types";
import { getAllChats } from "@/lib/actions/chat.actions";
import { Icons } from "@/app/utils/icons";
import ProductPanel from "./product-panel";
import UserUnauthorized from "./user-unauthorized";
import BuyerInvites from "./invites";
import useChatStore from "../../../hooks/useChatStore";

export default function UserChat({
  children = (
    <Button variant="ghost" size="icon">
      <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
    </Button>
  ),
}: {
  children?: React.ReactNode;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { discussions, otherUserDetails, createChat } = useChatStore();

  const [activeTab, setActiveTab] = useState<
    "seller" | "buyer" | "invites" | ""
  >("seller");

  const { data } = useQuery({
    queryKey: ["getAllChats", userId],
    queryFn: () => getAllChats(userId ?? ""),
    enabled: userId !== undefined,
  });

  const handleTabChange = (tab: "seller" | "buyer" | "invites") => {
    setActiveTab(tab);
    if (tab === "seller") {
      createChat({
        discussions: [],
        otherUserDetails: {
          id: "",
          name: "",
          otherUserPhoneNumber: "",
          avatar: "",
        },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
      });
    } else if (tab === "buyer") {
      createChat({
        discussions: data?.data.resultWhereUserIsBuyer ?? [],
        otherUserDetails: {
          id: "",
          name: "",
          otherUserPhoneNumber: "",
          avatar: "",
        },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
      });
    }
  };

  function handleSetChat(discussions: chatDetails[]) {
    try {
      if (!discussions) {
        throw new Error("Unable to set this chat");
      }

      createChat({
        discussions,
        otherUserDetails: {
          id: "",
          name: "",
          otherUserPhoneNumber: "",
          avatar: "",
        },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
      });
    } catch (error) {
      throw error;
    }
  }
  function resetChat() {
    createChat({
      discussions: [],
      otherUserDetails: {
        id: "",
        name: "",
        otherUserPhoneNumber: "",
        avatar: "",
      },
      sellerDetails: { id: "" },
      buyerDetails: { id: "" },
    });
    setActiveTab("seller");
  }
  return userId ? (
    <div>
      <Sheet onOpenChange={resetChat}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side="left" className="w-[90vw] sm:w-[50vw]  lg:w-[90vw]">
          <SheetHeader className="flex justify-between px-4">
            {(discussions.length === 0 ||
              activeTab === "buyer" ||
              activeTab === "invites" ||
              activeTab === "") &&
              otherUserDetails.id === "" && (
                <Tabs defaultValue="Seller Chat" className="mt-2 w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="Seller Chats"
                      className={cn(
                        "rounded-lg p-0.5",
                        activeTab === "seller" &&
                          "bg-white text-black shadow-md transition-colors duration-300",
                      )}
                      onClick={() => handleTabChange("seller")}
                    >
                      As Seller
                    </TabsTrigger>
                    <TabsTrigger
                      value="Buyer Chats"
                      className={cn(
                        "rounded-lg p-0.5",
                        activeTab === "buyer" &&
                          "bg-white text-black shadow-md transition-colors duration-300",
                      )}
                      onClick={() => handleTabChange("buyer")}
                    >
                      As Buyer
                    </TabsTrigger>
                    <TabsTrigger
                      value="Invites"
                      className={cn(
                        "rounded-lg p-0.5",
                        activeTab === "invites" &&
                          "bg-white text-black shadow-md transition-colors duration-300",
                      )}
                      onClick={() => handleTabChange("invites")}
                    >
                      Invites
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
          </SheetHeader>
          {activeTab === "seller" &&
            data?.data.resultWhereUserIsSeller1 &&
            (discussions.length === 0 ? (
              <div className="mt-4 flex w-full select-none flex-col space-y-4 px-6">
                {Array.from(data?.data.resultWhereUserIsSeller1.entries()).map(
                  ([productId, discussions], idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer rounded-lg border bg-muted p-2 drop-shadow-md hover:drop-shadow-lg"
                      onClick={() => {
                        handleSetChat(discussions);
                        setActiveTab("");
                      }}
                    >
                      <div
                        key={discussions[0].sellerDetails.Username}
                        className="flex space-x-4"
                      >
                        {discussions[0]?.productDetails?.Images?.[0] && (
                          <Image
                            src={discussions[0].productDetails.Images[0]}
                            alt="Product Image"
                            fill
                            className="rounded-md"
                            sizes="100"
                          />
                        )}
                        <div className="flex flex-col justify-center">
                          <h1 className="mb-2 line-clamp-1 text-lg font-bold text-black dark:text-white">
                            {discussions[0].productDetails.Product_Name}
                          </h1>
                          <div className="flex flex-col">
                            {discussions.map(
                              (dis: chatDetails, idx: number) =>
                                idx < 1 && (
                                  <div
                                    key={idx}
                                    className="text-sm text-muted-foreground"
                                  >
                                    Buyers: {dis.buyerDetails.Name}
                                  </div>
                                ),
                            )}
                            {discussions.length > 1 && (
                              <div className="text-sm text-gray-700">
                                ...{discussions.length}more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <ProductPanel userId={userId} />
            ))}
          {activeTab !== "seller" &&
            (activeTab !== "invites" ? (
              <ProductPanel userId={userId} />
            ) : (
              <BuyerInvites userId={userId} />
            ))}
        </SheetContent>
      </Sheet>
    </div>
  ) : (
    <UserUnauthorized />
  );
}
