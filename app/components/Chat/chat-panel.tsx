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
import { getAllChats, getUserId } from "@/lib/actions/chat.actions";
import ProductPanel from "./product-panel";
import UserUnauthorized from "./user-unauthorized";
import useChatStore from "../../../hooks/useChatStore";
import BuyerInvites from "./invites";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserChat() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";
  const [userId, setUserId] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function fetchUserId() {
      const id = await getUserId({ email });
      setUserId(id);
    }
    fetchUserId();
  }, [email]);

  const { discussions, otherUserDetails, createChat, removeChat } =
    useChatStore();

  const [activeTab, setActiveTab] = useState<
    "seller" | "buyer" | "invites" | ""
  >("seller");

  const { data, status } = useQuery({
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
      console.error(error);
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
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
          </Button>
        </SheetTrigger>
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
                      value="Invites"
                      className={clsx(
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
                        key={discussions[0].sellerDetails.Phone_Number}
                        className="flex space-x-4"
                      >
                        <div className="relative h-16 w-16">
                          <Image
                            src={discussions[0].productDetails.Images[0]}
                            alt="product image"
                            fill
                            className="rounded-md"
                            sizes="100"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
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
                                    Buyers:{" "}
                                    {dis.buyerDetails.First_Name +
                                      " " +
                                      dis.buyerDetails.Last_Name}
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