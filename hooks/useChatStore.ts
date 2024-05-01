import { chatDetails } from "@/types";
import { create } from "zustand";

interface ChatStore {
  activeDiscussionGroup: {
    productId: string;
    discussionGroup: chatDetails[];
  } | null;
  activeDiscussion: chatDetails | null;
  lastMessages: Map<string, Array<string>> | null;

  setActiveDiscussionGroup: (
    productId: string,
    DiscussionGroup: chatDetails[],
  ) => void;
  removeDiscussionGroup: () => void;
  setActiveDiscussion: (discussion: chatDetails) => void;
  removeActiveDiscussion: () => void;
  updateLastMessage: (productId: string, by: string, message: string) => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  activeDiscussionGroup: null,
  activeDiscussion: null,
  lastMessages: null,

  setActiveDiscussion: (discussion: chatDetails) =>
    set((state) => ({
      ...state,
      activeDiscussion: discussion,
    })),
  removeActiveDiscussion: () =>
    set((state) => ({
      ...state,
      activeDiscussion: null,
    })),
  setActiveDiscussionGroup: (
    productId: string,
    discussionGroup: chatDetails[],
  ) =>
    set((state) => ({
      ...state,
      activeDiscussionGroup: { productId, discussionGroup },
    })),
  removeDiscussionGroup: () =>
    set(() => ({
      activeDiscussionGroup: null,
    })),
  updateLastMessage: (productId: string, by: string, message: string) =>
    set((state) => {
      const updatedLastMessages = new Map(state.lastMessages || []);
      updatedLastMessages.set(productId, [by, message]);
      return { ...state, lastMessages: updatedLastMessages };
    }),
}));
