"use client";
import { use, useEffect, useState } from "react";
import clsx from "clsx";
import { Tabs, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import { chatDetails } from "@/types";
import { getAllChats } from "@/lib/actions/chat.actions";
import ProductPanel from "./product-panel";
import UserUnauthorized from "./user-unauthorized";
import useChatStore from "../../../hooks/useChatStore";
import BuyerInvites from "./buyer-invites";
import { useQuery } from "@tanstack/react-query";

export default function UserChat({ userId }: { userId: string }) {
  const { discussions, otherUserDetails, createChat, removeChat } =
    useChatStore();
  const [
    productDiscussionsWhereUserIsSeller,
    setProductDiscussionsWhereUserIsSeller,
  ] = useState<Map<string, chatDetails[]> | null>(null);
  const [
    productDiscussionsWhereUserIsBuyer,
    setProductDiscussionsWhereUserIsBuyer,
  ] = useState<chatDetails[] | null>(null);
  const [activeTab, setActiveTab] = useState<"seller" | "buyer" | "invites">(
    "seller",
  );

  const { data, isFetching, status, error } = useQuery({
    queryKey: ["getAllChats", userId],
    queryFn: getPrevProductDiscussions,
  });

  async function getPrevProductDiscussions() {
    if (userId) {
      const data = await getAllChats(userId);
      setProductDiscussionsWhereUserIsSeller(
        data.data.resultWhereUserIsSeller1,
      );
      setProductDiscussionsWhereUserIsBuyer(data.data.resultWhereUserIsBuyer);
    }
  }

  const handleTabChange = (tab: "seller" | "buyer" | "invites") => {
    setActiveTab(tab);
    if (tab === "seller") {
      createChat({
        discussions: [],
        otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
        lockStatus: false,
      });
    } else if (tab === "buyer") {
      createChat({
        discussions: productDiscussionsWhereUserIsBuyer ?? [],
        otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
        lockStatus: false,
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
        otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
        lockStatus: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userId ? (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-screen sm:w-[60vw]  lg:w-[30vw]">
          <SheetHeader className="flex justify-between">
            {(discussions.length === 0 ||
              activeTab === "buyer" ||
              activeTab === "invites") &&
            otherUserDetails.id === "" ? (
              <Tabs defaultValue="Seller Chat" className="mt-2 w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="Seller Chats"
                    className={clsx(
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
                    className={clsx(
                      "rounded-lg p-0.5",
                      activeTab === "buyer" &&
                        "bg-white text-black shadow-md transition-colors duration-300",
                    )}
                    onClick={() => handleTabChange("buyer")}
                  >
                    As Buyer
                  </TabsTrigger>
                  <TabsTrigger
                    value="Buyer Invites"
                    className={clsx(
                      "rounded-lg p-0.5",
                      activeTab === "invites" &&
                        "bg-white text-black shadow-md transition-colors duration-300",
                    )}
                    onClick={() => handleTabChange("invites")}
                  >
                    Buyer Invites
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            ) : (
              discussions.length !== 0 &&
              otherUserDetails.id === "" && (
                <div className="flex items-center">
                  <Button
                    className="rounded-full"
                    variant={"ghost"}
                    size="icon"
                    onClick={() => {
                      if (otherUserDetails && otherUserDetails.id === "") {
                        removeChat("chatPanel");
                      } else if (otherUserDetails.id !== "") {
                        removeChat("productPanel");
                      }
                    }}
                  >
                    <Icons.moveback />
                  </Button>
                </div>
              )
            )}
          </SheetHeader>
          {activeTab === "seller" &&
            productDiscussionsWhereUserIsSeller &&
            (discussions.length === 0 ? (
              <SheetDescription className="mt-4 flex w-full select-none flex-col space-y-4">
                {Array.from(productDiscussionsWhereUserIsSeller.entries()).map(
                  ([productId, discussions], idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer rounded-lg border border-b-transparent p-4 shadow-md hover:border-b-2 hover:border-b-gray-300 dark:shadow-gray-700 "
                      onClick={() => handleSetChat(discussions)}
                    >
                      <div key={discussions[0].sellerDetails.Phone_Number}>
                        <div>
                          <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
                            {discussions[0].productDetails.Product_Name}
                          </h1>
                        </div>
                        <div className="flex flex-col">
                          {discussions.map(
                            (dis: chatDetails, idx: number) =>
                              idx < 1 && (
                                <div
                                  key={idx}
                                  className="text-sm text-gray-700 dark:text-gray-100"
                                >
                                  Buyers:{" "}
                                  {dis.buyerDetails.First_Name +
                                    " " +
                                    dis.buyerDetails.Last_Name}
                                </div>
                              ),
                          )}
                          {discussions.length > 1 && (
                            <div className="text-sm text-gray-700">
                              ...{discussions.length - 1}more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </SheetDescription>
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
