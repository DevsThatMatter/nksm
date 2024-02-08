import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem } from "@/app/components/ui/form";
import { Icons } from "@/app/utils/icons";
import { Input } from "@/app/components/ui/input";
import Skeleton from "react-loading-skeleton";
import FileUploadModal from "@/app/components/modals/fileUploadModal";
import axios from "axios";
import qs from "query-string";
import ImageUploadModal from "../modals/imageUploadModal";

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

  async function onSend(values: z.infer<typeof messageSchema>) {
   
    try {
      const message = values.content;
      const sender = userId ?? "Rajan";
      const fileUrl = ""; // Placeholder, we will update this with actual file URL
      const data = { message, sender, fileUrl };
      await axios.post(`/api/socket/messages?sellerId=${sellerDetails.id}&buyerId=${buyerDetails.id}&productId=${productId}`, data)
        .then((res) => {
          console.log(`res ${res}`);
        })
        .catch((err) => {
          console.log(`err ${err}`);
        });

      form.reset();
    } catch (error) {
      console.error(error);
    }
    console.log("from the frontend")
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSend)} className="flex max-w-full">
        <FormItem>
          <FormControl>
            <div className="flex flex-1">
              <div className="border p-1 rounded-md max-w-[95%] border-gray-400 dark:bg-gray-900 flex justify-between">
                <Input
                  disabled={isLoading}
                  className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                  {...form.register("content")}
                />
                <div className="flex space-x-1">
                  <FileUploadModal />
                  <ImageUploadModal />
                </div>
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
    </Form>
  );
}
