"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components//ui/sheet";
import { Button } from "@/app/components//ui/button";
import useChatStore from "../../../hooks/useChatStore";
import { Icons } from "@/app/utils/icons";
import { chatDetails } from "@/types";
import { getAllChats } from "@/lib/actions/chat.actions";
import { useState } from "react";
import ProductPanel from "./ProductPanel";
import { Types } from "mongoose";

export default function UserChat({ userId }: { userId: string }) {
  const chat = useChatStore((state) => state.discussions);
  const otherUserDetails = useChatStore((state) => state.otherUserDetails)
  const createChat = useChatStore((state) => state.createChat);
  const removeChat = useChatStore((state) => state.removeChat);
  function handleSetChat(discussions: chatDetails[]) {
    try {
      if (!discussions) {
        throw new Error("Unable to set this chat");
      }
      createChat({
        discussions,
        otherUserDetails: {
          id: "",
          name: "",
          otherUserPhoneNumber: ""
        },
        sellerDetails: {
          id: ""
        },
        buyerDetails: {
          id: ""
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  const [prodcutDiscussions, setProductDiscussions] = useState<Map<Types.ObjectId, chatDetails[]> | null>(null)
  

  async function getPrevProductDiscussions() {
    const data = await getAllChats(userId);
    setProductDiscussions(data);
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => { getPrevProductDiscussions() }}>
            <Icons.chaticon className="w-[1.32rem] h-[1.3rem]" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex justify-start">
              {chat.length !== 0 ? <Button
                className="justify-center"
                size={"icon"}
                variant="ghost"
                onClick={() => {
                  if (otherUserDetails && otherUserDetails.id === "") {
                    removeChat("chatPanel")
                  } else if (otherUserDetails.id !== "") {
                    removeChat("productPanel")
                  }
                }}
              >
                <Icons.moveback />
              </Button> : <span>Lets have some chats...</span>}
            </SheetTitle>
          </SheetHeader>
          {chat.length === 0 ? (
            prodcutDiscussions && (
              <SheetDescription className="mt-4 flex flex-col space-y-4 w-full select-none">
                {Array.from(prodcutDiscussions.entries()).map(([productId, discussions], idx) => (
                  <div key={idx} className="border rounded-md shadow-md cursor-pointer p-4 hover:shadow-xl dark:shadow-gray-700 bg-gradient-to-tr from-slate-200 via-slate-300 to-slate-400" onClick={() => {
                    handleSetChat(discussions)
                  }}>
                    <div key={discussions[0].sellerDetails.Phone_Number}>
                      <div>
                        <h1 className="text-xl font-bold mb-2 text-black">{discussions[0].productDetails.Product_Name}</h1>
                        <div className="mb-2">{
                          discussions.length > 1 ? "Owners:" : (discussions[0].buyerDetails.id === userId ? "Owner" : "You")
                        }</div>
                      </div>
                      <div className="flex flex-col">
                        {discussions.map((dis, idx) => (
                          (idx < 1) && (
                            <div key={idx} className="text-gray-700 text-sm">
                              {`${dis.sellerDetails.First_Name} ${dis.sellerDetails.Last_Name}`}
                            </div>
                          )
                        ))}
                        {discussions.length > 1 && (
                          <div className="text-gray-700 text-sm">+ {discussions.length - 1}more</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              </SheetDescription>
            )
          ) : (
            <ProductPanel userId={userId} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}