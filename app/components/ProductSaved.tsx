"use client";

import {
  getSaved,
  removeSavedProduct,
  saveProduct,
} from "@/lib/actions/products.actions";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "../utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const ProductSaved = ({ className, id }: { className: string; id: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handelSave() {
    const prom = saveProduct({ productId: id });
    toast.promise(prom, {
      loading: "Processing",
      success: (data) => {
        return (
          <span className={cn(data.error && "font-bold text-red-700")}>
            {data.msg || data.error}
          </span>
        );
      },
    });
    queryClient.invalidateQueries({
      queryKey: ["check-if-this-product-is-saved", id],
    });
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
    queryClient.invalidateQueries({
      queryKey: ["check-if-this-product-is-saved", id],
    });
  }

  const { data, isFetching } = useQuery({
    queryKey: ["check-if-this-product-is-saved", id],
    queryFn: () => getSaved({ productId: id }),
  });

  return (
    <div
      className={className}
      onClick={() => {
        setIsSaved(!isSaved);
      }}
    >
      {isFetching ? (
        <Skeleton className="h-4 w-4 rounded-full" />
      ) : !data ? (
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
