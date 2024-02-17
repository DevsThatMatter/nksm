import useChatStore from "@/hooks/useChatStore";
import { SheetDescription } from "../ui/sheet";
import ChatUI from "./ChatUI";
import { useState } from "react";
import { chatDetails } from "@/types";
import Image from "next/image";

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
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    // Extracted the logic to handle chat creation
    function handleSingleSellerChatSet(
        id: string,
        name: string,
        phoneNumber: string,
        seller: { id: string },
        buyer: { id: string }
    ) {
        try {
            createChat({
                discussions,
                otherUserDetails: { id, name, otherUserPhoneNumber: phoneNumber },
                sellerDetails: { id: seller.id },
                buyerDetails: { id: buyer.id },
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Extracted the logic to handle chat item click
    function handleChatItemClick(discussion: chatDetails) {
        const otherUserId =
            discussion.buyerDetails.id === userId ? discussion.sellerDetails.id : discussion.buyerDetails.id;
        const otherUserName =
            discussion.buyerDetails.id === userId
                ? `${discussion.sellerDetails.First_Name} ${discussion.sellerDetails.Last_Name}`
                : `${discussion.buyerDetails.First_Name} ${discussion.buyerDetails.Last_Name}`;
        const otherUserPhoneNumber =
            discussion.buyerDetails.id === userId
                ? discussion.sellerDetails.Phone_Number
                : discussion.buyerDetails.Phone_Number;

        handleSingleSellerChatSet(
            otherUserId,
            otherUserName,
            otherUserPhoneNumber,
            discussion.sellerDetails,
            discussion.buyerDetails
        );
        createBuyer(discussion.buyerDetails.id);
        createSeller(discussion.sellerDetails.id);
        setSelectedProductId(discussion.productDetails._id.toString());
        setProductId(String(discussion.productDetails._id));
    }

    return (
        <SheetDescription className="mt-4 flex flex-col space-y-4 w-full">
            {otherUserDetails.id === "" ? (
                discussions.map((discussion: chatDetails, idx) => (
                    <div key={idx} className="flex items-center space-x-2 flex-1 cursor-pointer p-2 rounded-md hover:shadow-md " onClick={() => handleChatItemClick(discussion)}>
                        <div className="flex-shrink-0 rounded-md bg-gray-600 overflow-hidden">
                            <Image src={discussion.productDetails.Images[0]} alt={discussion.productDetails.Product_Name} width={64} height={64} />
                        </div>
                        <div className="flex-grow px-4 py-2 cursor-pointer">
                            <span className="text-xl font-semibold dark:text-white text-black">{discussion.productDetails.Product_Name}</span>
                            <div className="flex justify-between">
                                <span className="text-gray-400 dark:text-gray-500 text-sm">
                                    {discussion.buyerDetails.id === userId ? "Seller: " + discussion.sellerDetails.First_Name + " " + discussion.sellerDetails.Last_Name : "Buyer: " + discussion.buyerDetails.First_Name + " " + discussion.buyerDetails.Last_Name}
                                </span>
                            </div>
                        </div>
                        <div aria-hidden className="bg-lime-500 rounded-full flex-shrink-0 w-6 h-6 text-white flex justify-center items-center" />
                    </div>
                ))
            ) : (
                <div>
                    <ChatUI
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
