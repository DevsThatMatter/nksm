import useChatStore from "@/hooks/useChatStore";
import { SheetDescription } from "../ui/sheet";
import ChatUI from "./ChatUI";
import { useState } from "react";
import { chatDetails } from "@/types";

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
                discussions.map((discussion: chatDetails) => (
                    <div
                        key={discussion.sellerDetails.Phone_Number}
                        className="border rounded-md shadow-md cursor-pointer p-4 hover:shadow-xl dark:shadow-gray-700 bg-gradient-to-tr from-slate-200 via-slate-300 to-slate-400"
                        onClick={() => handleChatItemClick(discussion)}
                    >
                        <div>
                            <h1 className="text-lg font-bold text-black">{discussion.productDetails.Product_Name}</h1>
                            <div className="text-gray-700 text-sm">
                                {discussion.sellerDetails.id === userId ? `You: ` : `Owner: `}
                                {`${discussion.sellerDetails.First_Name} ${discussion.sellerDetails.Last_Name}`}
                            </div>
                        </div>
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
