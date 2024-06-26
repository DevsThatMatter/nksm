import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Skeleton } from "@/app/components/ui/skeleton";
import { MessageTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ObjectId from "bson-objectid";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormItem } from "@/app/components/ui/form";
import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import { useChatStore } from "@/hooks/useChatStore";
import { createNewMessage, getChatStatus } from "@/lib/actions/chat.actions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

const messageSchema = z.object({
  content: z.string().min(1),
});

interface ChatInputProps {
  userId: string;
  productId: string;
  sellerDetails: { id: string };
  buyerDetails: { id: string };
  setMessages: Dispatch<SetStateAction<MessageTypes[]>>;
}

export default function ChatInput({
  userId,
  productId,
  buyerDetails,
  sellerDetails,
  setMessages,
}: ChatInputProps) {
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const [dealLock, setDealLock] = useState<boolean>(false);
  const [gLockedStatus, setGlockedStatus] = useState(false);
  const [focus, changeFocus] = useState<boolean>(false);
  const { setIsLocked } = useChatStore();

  useQuery({
    queryKey: ["lock-status", sellerDetails.id, buyerDetails.id, productId],
    queryFn: () =>
      getChatStatus({
        sellerId: sellerDetails.id,
        buyerId: buyerDetails.id,
        productId,
      }).then((data) => {
        if (data.status === "stale" || data.status === "dead") {
          setGlockedStatus(true);
          setIsLocked();
        }
      }),
  });

  async function onSend(values: z.infer<typeof messageSchema>) {
    try {
      const message = values.content;
      const sender = userId;
      const sellerId = sellerDetails.id;
      const buyerId = buyerDetails.id;
      const dealDone = dealLock;
      form.reset();
      const id = ObjectId().toHexString();
      const time = new Date().toISOString();
      setMessages((prevMessages: MessageTypes[]) => [
        {
          msgId: id,
          Sender: sender,
          Message: dealDone ? "Lets have a deal?" : message,
          options: dealDone,
          TimeStamp: time,
          accepted: "pending",
          readStatus: false,
        },
        ...prevMessages,
      ]);
      await createNewMessage(
        id,
        time,
        message,
        sender,
        dealDone,
        sellerId,
        buyerId,
        productId,
      );
      changeFocus(!focus);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    async function onDealSend(values: z.infer<typeof messageSchema>) {
      try {
        const message = values.content;
        const sender = userId;
        const sellerId = sellerDetails.id;
        const buyerId = buyerDetails.id;
        const dealDone = dealLock;
        form.reset();
        const id = ObjectId().toHexString();
        const time = new Date().toISOString();
        setMessages((prevMessages: MessageTypes[]) => [
          {
            msgId: id,
            Sender: sender,
            Message: dealDone ? "Lets have a deal?" : message,
            options: dealDone,
            TimeStamp: time,
            accepted: "pending",
            readStatus: false,
          },
          ...prevMessages,
        ]);
        await createNewMessage(
          id,
          time,
          message,
          sender,
          dealDone,
          sellerId,
          buyerId,
          productId,
        );
        changeFocus(!focus);
      } catch (error) {
        throw error;
      }
    }
    if (dealLock) {
      onDealSend({ content: "Let's have a deal?" });
      setDealLock(false);
    }
  }, [buyerDetails.id, dealLock, form, productId, sellerDetails.id, userId]);

  useEffect(() => {
    form.setFocus("content");
  }, [focus]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSend)}
        className="flex w-full border-none bg-muted p-1 "
      >
        <FormItem className="w-full">
          <FormControl>
            <div className="items flex w-full max-w-[97%] items-center justify-between  rounded-md bg-muted">
              <Input
                className={cn(
                  "max-h-[200px] min-h-[40px] w-full resize-y overflow-y-auto border-none bg-muted p-2 text-foreground shadow-none placeholder:text-accent-foreground focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
                placeholder="Type a message"
                {...form.register("content")}
                autoComplete="off"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    disabled={gLockedStatus}
                    type="button"
                    className="ml-3 h-full bg-blue-600 text-white transition-colors fade-out-0 hover:bg-blue-800"
                  >
                    Lock Deal
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-hidden rounded-lg bg-muted shadow-lg">
                  <DialogHeader className="mt-4 rounded-md bg-blue-600 px-4 py-3 text-white">
                    <DialogTitle className="text-lg font-bold">
                      Lock your deal...
                    </DialogTitle>
                  </DialogHeader>
                  <div className="px-6 py-4 ">
                    <h1 className="font-semibold text-yellow-400 md:text-lg ">
                      Attention:
                    </h1>{" "}
                    <p className="text-accent-foreground">
                      Confirm locking the deal? Once locked, it is irreversible.
                      If another user accepts the deal, all other chats about
                      this product will become inactive, except this one.
                    </p>
                  </div>

                  <div className="flex justify-end px-6 py-2">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="mr-2 bg-blue-600 text-white hover:bg-blue-600"
                        onClick={() => {
                          setDealLock(true);
                        }}
                      >
                        Lock
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="border border-red-500 bg-transparent text-red-400 hover:bg-transparent">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </FormControl>
        </FormItem>
        {(
          <button type="submit">
            <Icons.sendIcon
              className={cn(
                "mx-1 h-5 w-5 transform cursor-pointer rounded-full  transition-transform hover:text-blue-500",
              )}
            />{" "}
          </button>
        ) || <Skeleton className="size-10 rounded-full" />}
      </form>
    </Form>
  );
}
