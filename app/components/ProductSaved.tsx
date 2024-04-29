"use client";

import {
  removeSavedProduct,
  saveProduct,
} from "@/lib/actions/products.actions";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "../utils";
import { useProductStore } from "@/hooks/productStore";
import { SavedProduct } from "./Navbar/SavedItems";

const ProductSaved = ({
  className,
  product,
}: {
  className: string;
  product: SavedProduct;
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const { savedProducts, addSavedProduct, removeSavedProductFromCache } =
    useProductStore();

  async function handelSave() {
    const prom = saveProduct({ productId: product._id.toString() });
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
      productId: product._id.toString(),
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

  return (
    <div
      className={className}
      onClick={() => {
        setIsSaved(!isSaved);
      }}
    >
      {!savedProducts?.has(product._id.toString()) ? (
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
