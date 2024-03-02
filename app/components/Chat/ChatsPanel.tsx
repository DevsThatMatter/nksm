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
import ChatUI from "./ChatUI";
import { Icons } from "@/app/utils/icons";

interface Chat {
  name: string;
  phoneNumber: string;
}

export default function UserChat({
  children = (
    <Button variant="ghost" size="icon">
      <Icons.chaticon className="h-[1.3rem] w-[1.32rem]" />
    </Button>
  ),
}: {
  children?: React.ReactNode;
}) {
  const chat = useChatStore((state) => state.chat);
  const createChat = useChatStore((state) => state.createChat);
  const removeChat = useChatStore((state) => state.removeChat);
  function handleSetChat(phoneNumber: string) {
    try {
      if (!phoneNumber) {
        throw new Error("Unable to set this chat");
      }
      createChat({
        phoneNumber,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Dummy data
  const chats: Chat[] = [{ name: "Bits", phoneNumber: "+91-1234567800" }];
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        {chats ? (
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                {chat === "" ? (
                  <span>Lets have some chats...</span>
                ) : (
                  <Button
                    className="-left-4"
                    size={"icon"}
                    variant="ghost"
                    onClick={() => {
                      removeChat();
                    }}
                  >
                    <Icons.moveback />
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            {chat === "" ? (
              <SheetDescription className="mt-4 flex w-full flex-col space-y-4">
                {chats.map((chat) => (
                  <div
                    key={chat.phoneNumber}
                    className="flex cursor-pointer items-center justify-between rounded-md border p-2 shadow-md hover:shadow-xl"
                    onClick={() => handleSetChat(chat.phoneNumber)}
                  >
                    <div>
                      <h1 className="text-lg font-bold">{chat.name}</h1>
                      <p className="text-md font-medium">{chat.phoneNumber}</p>
                    </div>
                    {/* Add any additional information like last message or online status here */}
                  </div>
                ))}
              </SheetDescription>
            ) : (
              <ChatUI />
            )}
          </SheetContent>
        ) : (
          <div>{/* UI for no chats */}</div>
        )}
      </Sheet>
    </div>
  );
}
