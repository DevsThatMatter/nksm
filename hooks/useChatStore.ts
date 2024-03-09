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
  globalLockedStatus: boolean;
  createChat: (to: {
    discussions: chatDetails[];
    globalLockedStatus: boolean;
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
  createLockedStatus: (status: boolean) => void;
}

const chatStore = (set: (arg0: (state: ChatState) => ChatState) => void) => ({
  discussions: [],
  globalLockedStatus: false,
  otherUserDetails: { id: "", name: "", otherUserPhoneNumber: "", avatar: "" },
  sellerDetails: { id: "" },
  buyerDetails: { id: "" },
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
          globalLockedStatus: false,
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
      globalLockedStatus: status,
    })),
});

const useChatStore = create<ChatState>(chatStore);

export default useChatStore;
