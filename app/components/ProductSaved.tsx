"use client";

import {
  getSaved,
  removeSavedProduct,
  saveProduct,
} from "@/lib/actions/fetchProduct.actions";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "../utils";

const ProductSaved = ({ className, id }: { className: string; id: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  async function handelSave() {
    const prom = saveProduct({ productId: id });
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

  async function handleDelete() {
    const prom = removeSavedProduct({
      productId: id,
    });
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

  useEffect(() => {
    async function fetchSaved() {
      const saved = await getSaved({ productId: id });
      if (saved) {
        setIsSaved(true);
      }
    }
    fetchSaved();
  }, [id]);

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
