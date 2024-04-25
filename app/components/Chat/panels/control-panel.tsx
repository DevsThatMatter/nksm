"use client";

import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

import AsBuyerPanel from "./as-buyer-panel";
import AsSellerPanel from "./as-seller-panel";
import { chatDetails } from "@/types";
import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import InvitePanel from "./invites-panel";
import { useChatStore } from "../../../../hooks/useChatStore";

export default function ControlPanel({
  children = (
    <Button variant="ghost" size="icon">
      <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
    </Button>
  ),
  userId,
  data,
}: {
  children?: React.ReactNode;
  userId: string;
  data: {
    resultWhereUserIsBuyer: chatDetails[];
    resultWhereUserIsSeller1: Map<string, chatDetails[]>;
  };
}) {
  const { activeDiscussion, removeActiveDiscussion, removeDiscussionGroup } =
    useChatStore();

  function handelClose() {
    removeActiveDiscussion();
    removeDiscussionGroup();
  }
  return (
    <Sheet onOpenChange={() => handelClose()}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={"left"}
        className="h-full w-[75dvw] sm:w-[50dvw] lg:w-[60dvw]"
      >
        <Tabs
          defaultValue="seller"
          className={cn(!activeDiscussion && "h-full w-full")}
        >
          <TabsList
            className={cn(
              "mx-auto mt-2 grid h-[2.5rem] w-[90%] grid-cols-3",
              activeDiscussion && "hidden",
            )}
          >
            <TabsTrigger value="seller">As Seller</TabsTrigger>
            <TabsTrigger value="buyer">As Buyer</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
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
      </SheetContent>
    </Sheet>
  );
}
