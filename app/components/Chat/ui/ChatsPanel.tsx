"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";
import useChatStore from "../../../../hooks/useChatStore";
import ChatUI from "./ChatUI";
import { Icons } from "@/app/utils/icons";

interface Chat {
  name: string;
  phoneNumber: string;
}

export default function UserChat() {
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
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Icons.chaticon className="w-[1.32rem] h-[1.3rem]" />
          </Button>
        </SheetTrigger>
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
              <SheetDescription className="mt-4 flex flex-col space-y-4 w-full">
                {chats.map((chat) => (
                  <div
                    key={chat.phoneNumber}
                    className="flex items-center justify-between p-2 border rounded-md shadow-md cursor-pointer hover:shadow-xl"
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
