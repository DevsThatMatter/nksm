"use client";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const ProductSaved = ({ className, id }: { className: string; id: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div
      className={className}
      onClick={() => {
        setIsSaved(!isSaved);
      }}
    >
      {!isSaved ? (
        <BookmarkIcon className="w-4 h-4 text-gray-500" />
      ) : (
        <BookmarkFilledIcon className="w-4 h-4 text-gray-500" />
      )}
    </div>
  );
};

export default ProductSaved;
