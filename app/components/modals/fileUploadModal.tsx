"use client"; // Bits
import qs from "query-string";
import { useModal } from "@/hooks/useModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Icons } from "@/app/utils/icons";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import FileUpload from "../Chat/fileUpload";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Minimum one file is required",
  }),
});

export default function FileUploadModal() {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const isThisModelOpen = isOpen && type === "fileUpload";
  const { apiUrl, query } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      form.reset();
      // revalidatePath("/")
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button">
          <Icons.fileLink className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transform hover:scale-105 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a file...</DialogTitle>
          <DialogDescription>You may Upload any file</DialogDescription>
        </DialogHeader>

        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex items-center justify-center text-center">
                  <FormField
                    control={form.control}
                    name="fileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter className="px-6 py-4 flex-1">
                <Button variant={"default"} disabled={isLoading}>
                  Done
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
