// bits
import { chatDetails } from "@/lib/actions/chat.actions";
import { create } from "zustand";

interface ChatState {
    discussions: chatDetails[];
    otherUserDetails: {
        id: string;
        name: string;
        otherUserPhoneNumber: string;
    };
    sellerDetails: {
        id: string;
    };
    buyerDetails: {
        id: string;
    };
    createChat: (to: {
        discussions: chatDetails[];
        otherUserDetails: {
            id: string;
            name: string;
            otherUserPhoneNumber: string;
        };
        sellerDetails: {
            id: string;
        };
        buyerDetails: {
            id: string;
        };
    }) => void;
    removeChat: (caller: string) => void;
    createSeller: (sellerId: string) => void;
    createBuyer: (buyerId: string) => void;
}

const chatStore = (set: (arg0: (state: ChatState) => ChatState) => void) => ({
    discussions: [],
    otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
    sellerDetails: { id: "" },
    buyerDetails: { id: "" },
    createChat: (to: {
        discussions: chatDetails[];
        otherUserDetails: {
            id: string;
            name: string;
            otherUserPhoneNumber: string;
        };
        sellerDetails: {
            id: string;
        };
        buyerDetails: {
            id: string;
        };
    }) =>
        set((state) => ({
            ...state,
            discussions: to.discussions,
            otherUserDetails: to.otherUserDetails,
            sellerDetails: to.sellerDetails,
            buyerDetails: to.buyerDetails,
        })),
    removeChat: (caller: string) =>
        set((state) => {
            if (caller === "chatPanel") {
                return { ...state, discussions: [] };
            } else if (caller === "productPanel") {
                return { ...state, otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" } };
            }
            return state;
        }),
    createSeller: (sellerId: string) =>
        set((state) => ({
            ...state,
            sellerDetails: {
                id: sellerId,
            },
        })),
    createBuyer: (buyerId: string) =>
        set((state) => ({
            ...state,
            buyerDetails: {
                id: buyerId,
            },
        })),
});

const useChatStore = create<ChatState>(chatStore);

export default useChatStore;
