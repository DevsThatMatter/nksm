import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem } from "@/app/components/ui/form";
import { Icons } from "@/app/utils/icons";
import { Input } from "@/app/components/ui/input";
import Skeleton from "react-loading-skeleton";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useChatStore from "@/hooks/useChatStore";
import { createNewMessage, getChatStatus } from "@/lib/actions/chat.actions";
import { cn } from "@/app/utils";

const messageSchema = z.object({
  content: z.string().min(1),
});

interface ChatInputProps {
  userId: string;
  productId: string;
  otherUserId: string;
  otherUserName: string;
  otherUserPhoneNumber: string;
  sellerDetails: { id: string };
  buyerDetails: { id: string };
}

export default function ChatInput({
  userId,
  productId,
  otherUserId,
  otherUserName,
  otherUserPhoneNumber,
  buyerDetails,
  sellerDetails,
}: ChatInputProps) {
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const [dealLock, setDealLock] = useState<boolean>(false);
  const [gLockedStatus, setGlockedStatus] = useState(false);

  useEffect(() => {
    async function fetchChatStatus() {
      const status = (
        await getChatStatus({
          sellerId: sellerDetails.id,
          buyerId: buyerDetails.id,
          productId,
        })
      ).status;
      if (status === "stale" || status === "dead") {
        setGlockedStatus(true);
      }
    }
    fetchChatStatus();
  }, [sellerDetails, buyerDetails, productId]);

  async function onSend(values: z.infer<typeof messageSchema>) {
    try {
      const message = values.content;
      const sender = userId;
      const sellerId = sellerDetails.id;
      const buyerId = buyerDetails.id;
      const dealDone = dealLock;
      await createNewMessage(
        message,
        sender,
        dealDone,
        sellerId,
        buyerId,
        productId,
      );
      form.reset();
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
        await createNewMessage(
          message,
          sender,
          dealDone,
          sellerId,
          buyerId,
          productId,
        );
        form.reset();
      } catch (error) {
        throw error;
      }
    }
    if (dealLock) {
      onDealSend({ content: "Let's have a deal?" });
      setDealLock(false);
    }
  }, [buyerDetails.id, dealLock, form, productId, sellerDetails.id, userId]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSend)}
        className="flex w-full border-none bg-muted p-1 "
      >
        <FormItem className="w-full">
          <FormControl>
            <div className="items flex w-full max-w-[97%] items-center justify-between  rounded-md bg-muted">
              <input
                className="max-h-[200px] min-h-[40px] w-full resize-y overflow-y-auto bg-muted p-2 text-foreground placeholder:text-accent-foreground focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                placeholder="Type a message"
                {...form.register("content")}
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
          <button type="submit" disabled={isLoading}>
            <Icons.sendIcon
              className={cn(
                "mx-1 h-5 w-5 transform cursor-pointer rounded-full  transition-transform hover:text-blue-500",
                isLoading && "text-gray-500",
              )}
            />{" "}
          </button>
        ) || (
          <Skeleton
            circle
            width={40}
            height={40}
            baseColor="#e2e8f0"
            highlightColor="#f7fafc"
          />
        )}
      </form>
    </Form>
  );
}
