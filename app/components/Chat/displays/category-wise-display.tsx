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
  // { productId: string; discussionGroup: chatDetails[]; }
  return (
    <section
      className={cn(
        "p-2",
        "cursor-pointer drop-shadow-md hover:drop-shadow-lg",
        "rounded-lg border",
        "flex space-x-2 bg-muted md:space-x-4",
      )}
      onClick={() => {
        setActiveDiscussionGroup(
          discussion.productId,
          discussion.discussionGroup,
        );
      }}
    >
      <Image
        src={discussion.discussionGroup[0].productDetails.Images[0]}
        alt={discussion.discussionGroup[0].productDetails.Product_Name}
        width={100}
        height={100}
        className="h-16 w-16 rounded-md"
      />
      <section>
        <h1>{discussion.discussionGroup[0].productDetails.Product_Name}</h1>
        <ul>
          <span className="text-sm text-muted-foreground">
            Buyer: {discussion.discussionGroup[0].buyerDetails.Name}
          </span>
          {discussion.discussionGroup.length > 1 && (
            <span className="text-sm text-muted-foreground">
              ...{discussion.discussionGroup.length - 1}more
            </span>
          )}
        </ul>
      </section>
    </section>
  );
}
