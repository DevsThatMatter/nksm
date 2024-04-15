"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  getSaved,
  removeSavedProduct,
} from "@/lib/actions/fetchProduct.actions";
import { Icons } from "@/app/utils/icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/app/utils";

export default function DeleteSavedProducts({
  productId,
  email,
}: {
  productId: string;
  email: string;
}) {
  const router = useRouter();
  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    const prom = removeSavedProduct({
      productId: productId,
    });
    await getSaved({ productId: productId });
    toast.promise(prom, {
      loading: "Processing",
      success: (data) => {
        return (
          <span className={cn(data.error && "text-red-700")}>
            {data.msg || data.error}
          </span>
        );
      },
    });
    router.refresh();
  }
  return (
    <Button
      size="icon"
      className="h-6 w-10 bg-red-300 text-foreground hover:bg-red-400"
      onClick={(event) => handleDelete(event)}
    >
      <Icons.delete className="text-red-700" />
    </Button>
  );
}
