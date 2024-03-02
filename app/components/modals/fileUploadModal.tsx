"use client"; // Bits
import qs from "query-string";
import { useModal } from "@/hooks/useModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
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
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button">
          <Icons.fileLink className="h-5 w-5 transform cursor-pointer text-blue-500 transition-transform hover:scale-105 hover:text-blue-700" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a file...</DialogTitle>
          <DialogDescription>You may Upload any file</DialogDescription>
        </DialogHeader>

        <div className=""></div>
      </DialogContent>
    </Dialog>
  );
}
