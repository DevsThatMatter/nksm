// bits
import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

interface ChatState {
  chat: string;
  createChat: (to: { phoneNumber: string }) => void;
  removeChat: () => void;
}

const chatStore = (set: (arg0: () => { chat: string }) => void) => ({
  chat: "",
  createChat: (to: { phoneNumber: string }) =>
    set(() => ({ chat: to.phoneNumber })),
  removeChat: () => set(() => ({ chat: "" })),
});

// we can use the presist for storing this in the users local storage, and the name refers to this states name in the user storage

const useChatStore = create<ChatState>(
  // devtools(
  // persist(
  chatStore,
  // { name: "currentChat" }
  // )
  // )
);

export default useChatStore;
