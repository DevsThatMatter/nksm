import { chatDetails } from "@/types";
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
  lockStatus: boolean;
  createChat: (to: {
    discussions: chatDetails[];
    lockStatus: boolean;
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
  removeChat: (caller: "productPanel" | "chatPanel" | "chatUi") => void;
  createSeller: (sellerId: string) => void;
  createBuyer: (buyerId: string) => void;
  createLockedStatus: (status: boolean) => void;
}

const chatStore = (set: (arg0: (state: ChatState) => ChatState) => void) => ({
  discussions: [],
  lockStatus: false,
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
  removeChat: (caller: "productPanel" | "chatPanel" | "chatUi") =>
    set((state) => {
      if (caller === "chatPanel") {
        return { ...state, discussions: [] };
      } else if (caller === "productPanel") {
        return {
          ...state,
          otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
        };
      } else if (caller === "chatUi") {
        return {
          ...state,
          discussions: [],
          otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "" },
          lockStatus: false,
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
  createLockedStatus: (status: boolean) =>
    set((state) => ({
      ...state,
      lockStatus: status,
    })),
});

const useChatStore = create<ChatState>(chatStore);

export default useChatStore;
