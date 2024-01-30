// bits
import { transferData } from "@/components/Chat/userChat";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ChatState {
    chat: transferData;
    createChat: (to: transferData) => void;
    removeChat: () => void
}

const chatStore = (set: (arg0: () => {
    chat: transferData
}) => void) => ({
    chat: { productId: "", sellerPhone: "", buyerPhone: "" },
    createChat: (to: transferData) => set(() => ({ chat: to })),
    removeChat: () => set(() => ({ chat: { productId: "", sellerPhone: "", buyerPhone: "" } }))
});


// we can use the presist for storing this in the users local storage, and the name refers to this states name in the user storage

const useChatStore = create<ChatState>(
    chatStore
);

export default useChatStore;
