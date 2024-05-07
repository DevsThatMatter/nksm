import { cn } from "@/app/utils";
import { chatDetails } from "@/types";
import Image from "next/image";
import React from "react";
import { useChatStore } from "../../../../hooks/useChatStore";

export default function CategoryWiseDisplay({
  discussion,
}: {
  discussion: { productId: string; discussionGroup: chatDetails[] };
}) {
  const { setActiveDiscussionGroup } = useChatStore();

  return (
    <section
      className={cn(
        "p-2",
        "cursor-pointer drop-shadow-md hover:drop-shadow-lg",
        "rounded-lg border",
        "flex items-center space-x-2 bg-muted md:space-x-4",
      )}
      onClick={() => {
        setActiveDiscussionGroup(
          discussion.productId,
          discussion.discussionGroup,
        );
      }}
    >
      <Image
        src={discussion.discussionGroup[0].productDetails?.Images?.[0]}
        alt={discussion.discussionGroup[0].productDetails.Product_Name}
        width={100}
        height={100}
        className="h-16 w-16 rounded-md"
      />
      <section className="flex flex-col space-y-1.5 pl-2">
        <h1 className="line-clamp-1 text-lg font-bold">
          {discussion.discussionGroup[0].productDetails.Product_Name}
        </h1>
        <ul className="flex">
          <h3 className="text-sm text-muted-foreground">
            {discussion.discussionGroup.length > 1 ? "Buyers" : "Buyer"}:{" "}
            {discussion.discussionGroup[0].buyerDetails.Name}
          </h3>
          {discussion.discussionGroup.length > 1 && (
            <span className="text-sm text-muted-foreground">
              ...{" " + (discussion.discussionGroup.length - 1) + " more"}
            </span>
          )}
        </ul>
      </section>
    </section>
  );
}
