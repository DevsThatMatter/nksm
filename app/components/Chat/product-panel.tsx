import useChatStore from "@/hooks/useChatStore";
import { SheetDescription } from "../ui/sheet";
import ChatUI from "./chat-ui";
import { useEffect, useState } from "react";
import { chatDetails } from "@/types";
import Image from "next/image";
import { countUnreadMessages } from "@/lib/actions/chat.actions";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import clsx from "clsx";

interface ProductPanelProps {
  userId: string;
}

export default function ProductPanel({ userId }: ProductPanelProps) {
  // Destructuring state from useChatStore
  const {
    discussions,
    otherUserDetails,
    sellerDetails,
    buyerDetails,
    createChat,
    createBuyer,
    createSeller,
  } = useChatStore();

  const [productId, setProductId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"invites" | "activeChats">(
    "activeChats",
  );

  // Extracted the logic to handle chat creation
  function handleSingleSellerChatSet(
    id: string,
    name: string,
    phoneNumber: string,
    avatar: string,
    seller: { id: string },
    buyer: { id: string },
  ) {
    try {
      createChat({
        discussions,
        otherUserDetails: {
          id,
          name,
          otherUserPhoneNumber: phoneNumber,
          avatar: avatar,
        },
        sellerDetails: { id: seller.id },
        buyerDetails: { id: buyer.id },
        lockStatus: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleChatItemClick(discussion: chatDetails) {
    console.log(
      `buyer => ${discussion.buyerDetails.id}`,
      `seller => ${discussion.sellerDetails.id}`,
      `current user => ${userId}`,
    );
    const otherUserId =
      discussion.buyerDetails.id === userId
        ? discussion.sellerDetails.id
        : discussion.buyerDetails.id;
    const otherUserName =
      discussion.buyerDetails.id === userId
        ? `${discussion.sellerDetails.First_Name} ${discussion.sellerDetails.Last_Name}`
        : `${discussion.buyerDetails.First_Name} ${discussion.buyerDetails.Last_Name}`;
    const otherUserPhoneNumber =
      discussion.buyerDetails.id === userId
        ? discussion.sellerDetails.Phone_Number
        : discussion.buyerDetails.Phone_Number;
    const otherUserAvatar =
      discussion.buyerDetails.id === userId
        ? discussion.sellerDetails.Avatar
        : discussion.buyerDetails.Avatar;
    handleSingleSellerChatSet(
      otherUserId,
      otherUserName,
      otherUserPhoneNumber,
      otherUserAvatar,
      discussion.sellerDetails,
      discussion.buyerDetails,
    );
    createBuyer(discussion.buyerDetails.id);
    createSeller(discussion.sellerDetails.id);
    setSelectedProductId(discussion.productDetails.productId);
    setProductId(discussion.productDetails.productId);
  }

  const [productReadCounts, setProductReadCounts] = useState<{
    [productId: string]: number;
  }>({});
  useEffect(() => {
    async function getUnreadCount(
      pId: string,
      sellerId: string,
      buyerId: string,
    ) {
      if (pId && sellerId && buyerId) {
        const count = await countUnreadMessages({
          sellerId,
          buyerId,
          productId: pId,
          caller: "get",
          currentUser: userId,
        });
        return count;
      } else {
        return 0;
      }
    }

    Promise.all(
      discussions.map(async (chat) => {
        const sellerId = chat.sellerDetails.id;
        const buyerId = chat.buyerDetails.id;
        const productId = String(chat.productDetails.productId);
        const unreadCount = await getUnreadCount(productId, sellerId, buyerId);
        return { productId: productId, unreadCount: unreadCount };
      }),
    ).then((updatedProductPanelInfo) => {
      const productReadCountsObj = updatedProductPanelInfo.reduce(
        (acc: { [key: string]: number }, cur) => {
          acc[cur.productId] = cur.unreadCount;
          return acc;
        },
        {},
      );
      setProductReadCounts(productReadCountsObj);
    });
  }, [discussions, userId]);

  return (
    <SheetDescription className="mt-4 flex w-full flex-col space-y-4">
      {otherUserDetails.id === "" ? (
        discussions.map((discussion: chatDetails, idx) => (
          <div
            key={idx}
            className="flex cursor-pointer items-center space-x-5 rounded-lg border border-b-transparent p-2 shadow-md hover:border-b-2 hover:border-b-gray-300 dark:shadow-gray-700"
            onClick={() => {
              handleChatItemClick(discussion);
            }}
          >
            <div className="flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={discussion.sellerDetails.Avatar}
                alt={discussion.productDetails.Product_Name}
                width={64}
                height={64}
              />
            </div>
            <div className="flex-grow cursor-pointer">
              <span className="font-semibold text-black dark:text-white">
                {discussion.productDetails.Product_Name}
              </span>
              <div className="flex justify-between">
                <h5 className="text-sm text-gray-400 dark:text-gray-500">
                  {discussion.buyerDetails.id === userId
                    ? `Seller: ${discussion.sellerDetails.First_Name} ${discussion.sellerDetails.Last_Name}`
                    : `Buyer: ${discussion.buyerDetails.First_Name} ${discussion.buyerDetails.Last_Name}`}
                </h5>
              </div>
            </div>
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lime-500 px-1 text-lg">
              <h3 className="font-semibold text-white">
                {productReadCounts[String(discussion.productDetails.productId)]}
              </h3>
            </div>
          </div>
        ))
      ) : (
        <div>
          <ChatUI
            avatar={otherUserDetails.avatar}
            currentUserId={userId}
            sellerId={sellerDetails.id}
            buyerId={buyerDetails.id}
            otherUserId={otherUserDetails.id}
            productId={productId || ""}
            otherUserName={otherUserDetails.name}
            otherUserPhoneNumber={otherUserDetails.otherUserPhoneNumber}
          />
        </div>
      )}
    </SheetDescription>
  );
}
