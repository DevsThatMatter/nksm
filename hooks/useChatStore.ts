import { chatDetails } from "@/types";
import { create } from "zustand";

interface ChatState {
  discussions: chatDetails[];
  otherUserDetails: {
    id: string;
    name: string;
    otherUserPhoneNumber: string;
    avatar: string;
  };
  sellerDetails: {
    id: string;
  };
  buyerDetails: {
    id: string;
  };
  asSellerChat: boolean;
  createChat: (to: {
    discussions: chatDetails[];
    otherUserDetails: {
      id: string;
      name: string;
      otherUserPhoneNumber: string;
      avatar: string;
    };
    sellerDetails: {
      id: string;
    };
    buyerDetails: {
      id: string;
    };
  }) => void;
  removeChat: (caller: "productPanel" | "chatPanel" | "chatUi") => void;
  createSeller: (sellerId: string) => void;
  createBuyer: (buyerId: string) => void;
  setAsSellerChat: () => void;
  removeAsSellerChat: () => void;
}

const chatStore = (set: (arg0: (state: ChatState) => ChatState) => void) => ({
  discussions: [],
  otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "", avatar: "" },
  sellerDetails: { id: "" },
  buyerDetails: { id: "" },
  asSellerChat: false,
  createChat: (to: {
    discussions: chatDetails[];
    otherUserDetails: {
      id: string;
      name: string;
      otherUserPhoneNumber: string;
      avatar: string;
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
  removeChat: (caller: "productPanel" | "chatPanel" | "chatUi") =>
    set((state) => {
      if (caller === "chatPanel") {
        return { ...state, discussions: [] };
      } else if (caller === "productPanel") {
        return {
          ...state,
          otherUserDetails: {
            id: "",
            name: "",
            otherUserPhoneNumber: "",
            avatar: "",
          },
        };
      } else if (caller === "chatUi") {
        return {
          ...state,
          discussions: [],
          otherUserDetails: {
            id: "",
            name: "",
            otherUserPhoneNumber: "",
            avatar: "",
          },
        };
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
  setAsSellerChat: () => set((state) => ({ ...state, asSellerChat: true })),
  removeAsSellerChat: () => set((state) => ({ ...state, asSellerChat: false })),
});

const useChatStore = create<ChatState>(chatStore);

export default useChatStore;
