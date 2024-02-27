"use client";
import { useEffect, useState } from "react";
import { Types } from "mongoose";
import clsx from "clsx";
import { Tabs, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger, } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import { chatDetails } from "@/types";
import { getAllChats } from "@/lib/actions/chat.actions";
import ProductPanel from "./product-panel"; 
import UserUnauthorized from "./user-unauthorized";
import useChatStore from "../../../hooks/useChatStore";


export default function UserChat({ userId }: { userId: string }) {
  const { discussions, otherUserDetails, createChat, removeChat, } = useChatStore();
  const [productDiscussionsWhereUserIsSeller, setProductDiscussionsWhereUserIsSeller] = useState<Map<string, chatDetails[]> | null>(null);
  const [productDiscussionsWhereUserIsBuyer, setProductDiscussionsWhereUserIsBuyer] = useState<chatDetails[] | null>(null);
  const [activeTab, setActiveTab] = useState('seller');


  useEffect(() => {
    async function getPrevProductDiscussions() {
      if (userId) {
        const data = await getAllChats(userId);
        setProductDiscussionsWhereUserIsSeller(data.data.resultWhereUserIsSeller1);
        setProductDiscussionsWhereUserIsBuyer(data.data.resultWhereUserIsBuyer)
      }
    }
    getPrevProductDiscussions();
  }, [userId]);

  const handleTabChange = (tab: string) => {
    if (tab === "seller") {
      createChat({
        discussions: [],
        otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
        lockStatus: false
      })
    } else {
      createChat({
        discussions: productDiscussionsWhereUserIsBuyer ?? [],
        otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
        sellerDetails: { id: "" },
        buyerDetails: { id: "" },
        lockStatus: false
      })
    }
    setActiveTab(tab);
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
        lockStatus: false
      });
    } catch (error) {
      console.error(error);
    }
  }



  return (
    userId ? (
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.chaticon className="w-[1.32rem] h-[1.3rem]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="flex justify-between">
              {
                (discussions.length === 0 || activeTab === "buyer") && otherUserDetails.id === "" ? (
                  <Tabs defaultValue="Seller Chat" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="Seller Chats"
                        className={clsx(
                          "p-0.5 rounded-lg",
                          activeTab === "seller" && "bg-white text-black shadow-md transition-colors duration-300"
                        )}
                        onClick={() => handleTabChange("seller")}
                      >
                        As Seller
                      </TabsTrigger>
                      <TabsTrigger
                        value="Buyer Chats"
                        className={clsx(
                          "p-0.5 rounded-lg",
                          activeTab === "buyer" && "bg-white text-black shadow-md transition-colors duration-300"
                        )}
                        onClick={() => handleTabChange("buyer")}
                      >
                        As Buyer
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                ) : (
                  <div className="flex items-center">
                    <Button
                      variant={'ghost'}
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
                    <h1 className="text-lg font-semibold dark:text-gray-50">{"Let's have some chats..."}</h1>
                  </div>
                )
              }
            </SheetHeader>
            {discussions.length === 0 ? (
              productDiscussionsWhereUserIsSeller && (
                <SheetDescription className="mt-4 flex flex-col space-y-4 w-full select-none">
                  {activeTab === "seller" && (
                    Array.from(productDiscussionsWhereUserIsSeller.entries()).map(([productId, discussions], idx) => (
                      <div key={idx} className="border rounded-lg cursor-pointer p-4 dark:shadow-gray-700 shadow-md border-b-transparent hover:border-b-2 hover:border-b-gray-300 " onClick={() => {
                        handleSetChat(discussions);
                      }}>

                        <div key={discussions[0].sellerDetails.Phone_Number}>
                          <div>
                            <h1 className="text-xl font-bold mb-2 text-black dark:text-white">{discussions[0].productDetails.Product_Name}</h1>
                          </div>
                          <div className="flex flex-col">
                            {discussions.map((dis, idx) => (
                              (idx < 1) && (
                                <div key={idx} className="text-gray-700 text-sm dark:text-gray-100">
                                  Buyers: {dis.buyerDetails.First_Name + " " + dis.buyerDetails.Last_Name}
                                </div>
                              )
                            ))}
                            {discussions.length > 1 && (
                              <div className="text-gray-700 text-sm">...{discussions.length - 1}more</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </SheetDescription>
              )
            ) : (
              <ProductPanel userId={userId} />
            )}
          </SheetContent>
        </Sheet>
      </div>
    ) : (
      <UserUnauthorized />
    )
  )
}
