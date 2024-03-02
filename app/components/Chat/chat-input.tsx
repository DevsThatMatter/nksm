import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/app/components/ui/form";
import { Icons } from "@/app/utils/icons";
import { Input } from "@/app/components/ui/input";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import useChatStore from "@/hooks/useChatStore";
import { createNewMessage } from "@/lib/actions/chat.actions";

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
  const [dealLock, setDealLock] = useState<boolean>(false)
  const { lockStatus } = useChatStore()

  async function onSend(values: z.infer<typeof messageSchema>) {

    try {
      const message = values.content;
      const sender = userId;
      const sellerId = sellerDetails.id
      const buyerId = buyerDetails.id
      const dealDone = dealLock
      await createNewMessage(message, sender, dealDone, sellerId, buyerId, productId);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (dealLock) {
      onSend({ content: "Let's have a deal?" });
      setDealLock(false);
    }
  }, [dealLock]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSend)} className="flex max-w-full">
        <FormItem>
          <FormControl>
            <div className="flex flex-1">
              <div className="border p-1 rounded-md max-w-[97%] border-gray-400 dark:bg-gray-900 flex justify-between">
                <Input
                  disabled={isLoading}
                  className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none resize-none" // Add the 'resize-none' class
                  style={{ height: 'auto', overflow: 'hidden' }} 
                  {...form.register("content")}
                />

                <Dialog>
                  <DialogTrigger asChild disabled={lockStatus}>
                    <button type="button" className="focus:outline-none">
                      <Button
                        
                        type="button"
                        className="bg-blue-600 hover:bg-blue-600 transition-colors fade-out-0"
                      >
                        Lock Deal
                      </Button>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <DialogHeader className="bg-blue-600 text-white py-3 px-4 mt-4 rounded-md">
                      <DialogTitle className="text-lg font-bold">Lock your deal...</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="py-4 px-6 ">
                      <h1 className="text-yellow-400 font-semibold md:text-lg ">Warning:</h1> Are you sure you want to lock the deal? Once locked, the deal cannot be unlocked.
                    </DialogDescription>
                    <div className="flex justify-end py-4 px-6">
                      <DialogClose asChild>
                        <Button
                          disabled={lockStatus}
                          type="button"
                          className="mr-2 bg-blue-600 hover:bg-blue-600 text-white"
                          onClick={() => {
                            setDealLock(true);
                          }}
                        >
                          Lock
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </FormControl>
        </FormItem>
        {(
          <button type="submit">
            <Icons.sendIcon className="w-9 h-9 bg-blue-200 dark:bg-blue-300 p-2 rounded-full text-blue-500 dark:text-blue-700 cursor-pointer  transform hover:scale-105 transition-transform" />{" "}
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
    </Form >
  );
}