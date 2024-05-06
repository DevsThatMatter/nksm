import { chatDetails } from "@/types";
import { create } from "zustand";

interface ChatStore {
  activeDiscussionGroup: {
    productId: string;
    discussionGroup: chatDetails[];
  } | null;
  activeDiscussion: chatDetails | null;
  lastMessages: Map<string, Array<string>> | null;
  isLocked: boolean;

  setActiveDiscussionGroup: (
    productId: string,
    DiscussionGroup: chatDetails[],
  ) => void;
  removeDiscussionGroup: () => void;
  setActiveDiscussion: (discussion: chatDetails) => void;
  removeActiveDiscussion: () => void;
  updateLastMessage: (key: string, by: string, message: string) => void;
  setIsLocked: () => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  activeDiscussionGroup: null,
  activeDiscussion: null,
  lastMessages: null,
  isLocked: false,

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
  updateLastMessage: (key: string, by: string, message: string) =>
    set((state) => {
      const updatedLastMessages = new Map(state.lastMessages || []);
      updatedLastMessages.set(key, [by, message]);
      return { ...state, lastMessages: updatedLastMessages };
    }),
  setIsLocked: () =>
    set(() => ({
      isLocked: true,
    })),
}));
