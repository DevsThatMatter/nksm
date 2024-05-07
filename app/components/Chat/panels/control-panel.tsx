"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import AsBuyerPanel from "./as-buyer-panel";
import AsSellerPanel from "./as-seller-panel";
import { chatDetails } from "@/types";
import { cn } from "@/app/utils";
import InvitePanel from "./invites-panel";
import { useChatStore } from "@/hooks/useChatStore";
import { Icons } from "@/app/utils/icons";

export default function ControlPanel({
  userId,
  data,
}: {
  userId: string;
  data: {
    resultWhereUserIsBuyer: chatDetails[];
    resultWhereUserIsSeller1: Map<string, chatDetails[]>;
  };
}) {
  const { activeDiscussion, activeDiscussionGroup, removeDiscussionGroup } =
    useChatStore();

  return (
    <Tabs
      defaultValue="seller"
      className={cn(!activeDiscussion && "mt-2 h-full w-full")}
    >
      {!activeDiscussion && activeDiscussionGroup && (
        <button
          className="absolute top-3.5 rounded-full"
          onClick={() => removeDiscussionGroup()}
        >
          <Icons.moveback className="h-6 w-6" />
        </button>
      )}
      <TabsList
        className={cn(
          "mx-auto grid h-[2.5rem] w-[90%] grid-cols-3",
          activeDiscussion && "hidden",
        )}
      >
        <TabsTrigger value="seller">As Seller</TabsTrigger>
        <TabsTrigger onClick={() => removeDiscussionGroup()} value="buyer">
          As Buyer
        </TabsTrigger>
        <TabsTrigger onClick={() => removeDiscussionGroup()} value="invites">
          Invites
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="seller"
        className={cn(
          activeDiscussion
            ? "mt-0 h-[calc(100dvh)]"
            : "mt-0 h-[calc(100dvh-3rem)]",
        )}
      >
        <AsSellerPanel
          userId={userId}
          discussions={data.resultWhereUserIsSeller1}
        />
      </TabsContent>
      <TabsContent
        value="buyer"
        className={cn(
          activeDiscussion
            ? "mt-0 h-[calc(100dvh)]"
            : "mt-0 h-[calc(100dvh-3rem)]",
        )}
      >
        <AsBuyerPanel
          endpoint="buyer"
          userId={userId}
          discussions={{
            productId: undefined,
            discussionGroup: data.resultWhereUserIsBuyer,
          }}
        />
      </TabsContent>
      <TabsContent value="invites" className="mt-0 h-[calc(100dvh-3rem)]">
        <InvitePanel userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
