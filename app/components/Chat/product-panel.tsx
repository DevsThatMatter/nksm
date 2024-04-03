import useChatStore from "@/hooks/useChatStore";
import ChatUI from "./chat-ui";
import { useEffect, useState } from "react";
import { chatDetails } from "@/types";
import Image from "next/image";
import {
  countUnreadMessages,
  getLastMessages,
} from "@/lib/actions/chat.actions";
import { useQueries } from "@tanstack/react-query";

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
        refetchInterval: 10000,
      };
    }),
  });

  useEffect(() => {
    unreadResults.forEach((result) => {
      const { unreadCount, productId } = result.data ?? {
        productId: undefined,
        unreadCount: null,
      };
      if (productId && unreadCount) {
        setProductReadCounts((prevCounts) => {
          const updatedCounts = new Map<string, number>(prevCounts || []);
          updatedCounts.set(productId, unreadCount);
          return updatedCounts;
        });
      }
    });
  }, [discussions]);

  return (
    <div className="flex h-full w-full flex-col">
      {otherUserDetails.id === "" ? (
        <div className="flex h-full flex-col px-6 pt-4">
          <section className="h-full space-y-4 overflow-y-auto">
            {discussions.map((discussion: chatDetails, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer rounded-lg border bg-muted p-2 drop-shadow-md hover:drop-shadow-lg"
                onClick={() => {
                  handleChatItemClick(discussion);
                }}
              >
                <div className="mx-2 flex-shrink-0 overflow-hidden rounded-full">
                  {discussion.sellerDetails.Avatar ? (
                    <Image
                      src={discussion.sellerDetails.Avatar}
                      alt={discussion.productDetails.Product_Name}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <div className="h-16 w-16 animate-pulse rounded-full bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-300" />
                  )}
                </div>
                <div className="ml-3 mt-1 flex-grow cursor-pointer">
                  <div className="flex justify-between">
                    {discussion.buyerDetails ? (
                      <h4 className="text-xl font-semibold text-black dark:text-white ">
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
                    {productReadCounts &&
                      productReadCounts.get(
                        discussion.productDetails.productId,
                      ) && (
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs dark:bg-blue-700">
                          <h3 className="font-semibold text-white">
                            {String(
                              productReadCounts.get(
                                discussion.productDetails.productId,
                              ),
                            )}
                          </h3>
                        </div>
                      )}
                  </div>
                  <div className="flex justify-between">
                    {results[idx].data?.lastMsg ? (
                      <h5 className="mt-2 text-sm text-muted-foreground">
                        {results[idx].data?.lastMsg}
                      </h5>
                    ) : (
                      results[0].status === "pending" && (
                        <h5 className="h-3 w-24 animate-pulse rounded-sm bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-300" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : (
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
      )}
    </div>
  );
}
