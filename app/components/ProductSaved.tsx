"use client";

import { auth } from "@/auth";
import {
  checkIfSaved,
  removeSavedProduct,
  saveProduct,
} from "@/lib/actions/fetchProduct.actions";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductSaved = ({ className, id }: { className: string; id: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  async function handelSave() {
    await saveProduct({ productId: id });
    router.refresh();
  }

  async function handleDelete() {
    await removeSavedProduct({
      productId: id,
    });
    router.refresh();
  }

  return (
    <div
      className={className}
      onClick={() => {
        setIsSaved(!isSaved);
      }}
    >
      {!isSaved ? (
        <BookmarkIcon
          className="h-4 w-4 text-gray-500"
          onClick={() => handelSave()}
        />
      ) : (
        <BookmarkFilledIcon
          className="h-4 w-4 text-gray-500"
          onClick={() => handleDelete()}
        />
      )}
    </div>
  );
};

export default ProductSaved;
