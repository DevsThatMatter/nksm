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
      const fileUrl = ""; // Placeholder, we will update this with actual file URL
      const data = { message, sender, fileUrl, dealDone: dealLock };
      await axios.post(`/api/socket/messages?sellerId=${sellerDetails.id}&buyerId=${buyerDetails.id}&productId=${productId}`, data)
        .then(function (res) {
          console.log(`res ${res}`);
        }).catch(function (err) {
          console.log(`err ${err}`);
        })

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
                  className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                  {...form.register("content")}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="focus:outline-none">
                      <Button
                        disabled={lockStatus}
                        type="button"
                        className="bg-amber-400 hover:bg-amber-500 transition-colors fade-out-0"
                      >
                        Lock Deal
                      </Button>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <DialogHeader className="bg-amber-500 text-white py-3 px-4 mt-4 rounded-md">
                      <DialogTitle className="text-lg font-bold">Lock your deal...</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="py-4 px-6 ">
                      <h1 className="text-rose-400 font-semibold md:text-lg ">Warning:</h1> Are you sure you want to lock the deal? Once locked, the deal cannot be unlocked.
                    </DialogDescription>
                    <div className="flex justify-end py-4 px-6">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          className="mr-2 bg-amber-500 hover:bg-amber-600 text-white"
                          onClick={() => {
                            setDealLock(true); // Update dealLock state here
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