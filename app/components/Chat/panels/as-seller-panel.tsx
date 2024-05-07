"use client";

import CategoryWiseDisplay from "../displays/category-wise-display";

import AsBuyerPanel from "./as-buyer-panel";
import { chatDetails } from "@/types";
import NoOneToTalk from "../no-one-to-talk";
import { cn } from "@/app/utils";
import { useChatStore } from "../../../../hooks/useChatStore";

export default function AsSellerPanel({
  discussions,
  userId,
}: {
  userId: string;
  discussions: Map<string, chatDetails[]>;
}) {
  const { activeDiscussionGroup } = useChatStore();

  if (discussions.size === 0) {
    return <NoOneToTalk endpoint={"seller"} />;
  }

  return (
    <main className="h-full">
      {!activeDiscussionGroup ? (
        <ul
          className={cn(
            "h-full",
            "px-4 pt-2",
            "flex flex-col space-y-3 overflow-y-auto",
          )}
        >
          {Array.from(discussions.entries() ?? []).map(
            ([product, discussions], idx) => {
              const obj = { productId: product, discussionGroup: discussions };
              return (
                <li key={idx}>
                  <CategoryWiseDisplay discussion={obj} />
                </li>
              );
            },
          )}
        </ul>
      ) : (
        <AsBuyerPanel
          endpoint="seller"
          userId={userId}
          discussions={activeDiscussionGroup}
        />
      )}
    </main>
  );
}
