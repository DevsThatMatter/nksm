"use client";
import React from "react";
import { Button } from "../ui/button";
import { removeSavedProduct } from "@/lib/actions/fetchProduct.actions";
import { Icons } from "@/app/utils/icons";
import { useRouter } from "next/navigation";

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
    await removeSavedProduct({
      productId: productId,
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
