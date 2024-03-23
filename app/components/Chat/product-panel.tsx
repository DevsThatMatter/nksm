import useChatStore from "@/hooks/useChatStore";
import { SheetDescription } from "../ui/sheet";
import ChatUI from "./chat-ui";
import { useEffect, useState } from "react";
import { chatDetails } from "@/types";
import Image from "next/image";
import {
  countUnreadMessages,
  getAllUserSentInvites,
  getLastMessages,
} from "@/lib/actions/chat.actions";
import { useQueries } from "@tanstack/react-query";
// import { countUnreadMessages } from "@/lib/actions/chat.actions";

interface ProductPanelProps {
  userId: string;
}

export default function ProductPanel({ userId }: ProductPanelProps) {
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
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleChatItemClick(discussion: chatDetails) {
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
  const [productReadCounts, setProductReadCounts] = useState<Map<
    string,
    number
  > | null>(null);

  const results = useQueries({
    queries: discussions.map((chat) => {
      const sellerId = chat.sellerDetails.id;
      const buyerId = chat.buyerDetails.id;
      const productId = String(chat.productDetails.productId);
      return {
        queryKey: ["last-messages", sellerId, buyerId, productId],
        queryFn: () =>
          getLastMessages({
            sellerId: sellerId,
            buyerId: buyerId,
            productId: productId,
          }),
        enabled: discussions.length > 0,
        refetchInterval: 10000,
      };
    }),
  });

  const unreadResults = useQueries({
    queries: discussions.map((chat) => {
      const sellerId = chat.sellerDetails.id;
      const buyerId = chat.buyerDetails.id;
      const productId = String(chat.productDetails.productId);
      console.log("calling");
      return {
        queryKey: ["unreadCount", sellerId, buyerId, productId],
        queryFn: () =>
          countUnreadMessages({
            sellerId: sellerId,
            buyerId: buyerId,
            productId: productId,
            caller: "get",
            currentUser: userId,
          }),
        enabled: discussions.length > 0,
      };
    }),
  });

  useEffect(() => {
    unreadResults.forEach((result) => {
      console.log(result.data);
      const { productId, cachedVal } = result.data ?? {
        productId: undefined,
        cachedVal: null,
      };
      if (productId && cachedVal) {
        setProductReadCounts((prevCounts) => {
          const updatedCounts = new Map<string, number>(prevCounts || []);
          updatedCounts.set(productId, cachedVal);
          return updatedCounts;
        });
      }
    });
  }, [discussions]);

  return (
    <SheetDescription className="mt-4 flex h-full w-full flex-col space-y-4">
      {otherUserDetails.id === "" ? (
        <div className="flex h-full flex-col">
          <section className="h-full overflow-y-auto">
            {discussions.map((discussion: chatDetails, idx) => (
              <div
                key={idx}
                className="flex h-[100px] cursor-pointer items-center space-x-5 rounded-lg border-b-2 border-b-gray-300 p-2 shadow-md hover:border-b-gray-400 dark:shadow-gray-700"
                onClick={() => {
                  handleChatItemClick(discussion);
                }}
              >
                <div className="flex-shrink-0 overflow-hidden rounded-full">
                  {discussion.sellerDetails.Avatar ? (
                    <Image
                      src={discussion.sellerDetails.Avatar}
                      alt={discussion.productDetails.Product_Name}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-300" />
                  )}
                </div>
                <div className="flex-grow cursor-pointer">
                  <div className="flex justify-between">
                    {discussion.buyerDetails ? (
                      <h4 className="text-lg font-semibold text-black dark:text-white ">
                        {discussion.buyerDetails.id === userId
                          ? discussion.sellerDetails.First_Name +
                            " " +
                            discussion.sellerDetails.Last_Name
                          : discussion.buyerDetails.First_Name +
                            " " +
                            discussion.buyerDetails.Last_Name}
                      </h4>
                    ) : (
                      <h5 className="h-4 w-36 animate-pulse rounded-sm bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-300" />
                    )}
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
                      <h3 className="font-semibold text-white">
                        {String(
                          productReadCounts?.get(
                            discussion.productDetails.productId,
                          ) ?? 0,
                        )}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    {results[idx].data?.lastMsg ? (
                      <h5 className="text-sm text-gray-400 dark:text-gray-500">
                        {results[idx].data?.lastMsg}
                      </h5>
                    ) : (
                      <h5 className="h-3 w-24 animate-pulse rounded-sm bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
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
