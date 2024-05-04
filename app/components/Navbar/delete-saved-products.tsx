"use client";
import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import { useProductStore } from "@/hooks/useProductStore";
import { getSaved, removeSavedProduct } from "@/lib/actions/products.actions";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DeleteSavedProducts({
  productId,
}: {
  productId: string;
}) {
  const { savedProducts, removeSavedProductFromCache } = useProductStore();
  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    savedProducts?.delete(productId);
    const prom = removeSavedProduct({
      productId: productId,
    });
    await getSaved({ productId: productId });
    toast.promise(prom, {
      loading: "Processing...",
      success: (data) => {
        return (
          <span className={cn(data.error && "text-red-700")}>
            {data.msg || data.error}
          </span>
        );
      },
    });
    removeSavedProductFromCache(productId);
  }
  return (
    <Button
      size="icon"
      variant="outline"
      className="group h-6 w-6 border-red-400 bg-transparent text-foreground hover:border-red-700"
      onClick={(event) => handleDelete(event)}
    >
      <Icons.delete className="text-red-400 group-hover:fill-red-700 group-hover:text-red-700" />
    </Button>
  );
}
