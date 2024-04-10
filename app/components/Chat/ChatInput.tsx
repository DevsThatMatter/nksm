import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem } from "@/app/components/ui/form";
import { Icons } from "@/app/utils/icons";
import { Input } from "@/app/components/ui/input";
import Skeleton from "react-loading-skeleton";
import FileUploadModal from "@/app/components/modals/fileUploadModal";
import { chatHandler } from "@/lib/actions/chat.actions";

interface chatInputProps {
  userId1: string;
  userId2: string;
}

// to check the empty messages are not sent
const messageSchema = z.object({
  content: z.string().min(1),
});

export default function ChatInput({ userId1, userId2 }: chatInputProps) {
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSend(values: z.infer<typeof messageSchema>) {
    try {
      await chatHandler(userId1, userId2)
        .then((res) => {
          console.log(`res ${res}`);
        })
        .catch((err) => {
          console.log(`err ${err}`);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSend)} className="flex max-w-full ">
        <FormItem>
          <FormControl>
            <div className="flex flex-1">
              <div className="flex max-w-[95%] justify-between rounded-md border border-gray-300 p-1 dark:bg-gray-900">
                <Input
                  disabled={isLoading}
                  className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...form.register("content")}
                />
                <div className="flex space-x-1">
                  <FileUploadModal />
                  <button type="button">
                    <Icons.image className="h-5 w-5 transform cursor-pointer text-blue-500 transition-transform hover:scale-105 hover:text-blue-700" />
                  </button>
                </div>
              </div>
            </div>
          </FormControl>
        </FormItem>
        {(
          <button type="submit">
            <Icons.sendIcon className="h-9 w-9 transform cursor-pointer rounded-full bg-blue-200 p-2 text-blue-500 transition-transform  hover:scale-105 dark:bg-blue-300 dark:text-blue-700" />{" "}
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
