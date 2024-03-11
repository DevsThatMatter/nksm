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
        //add to saved products after checking the auth
      }}
    >
      {!isSaved ? (
        <BookmarkIcon className="h-4 w-4 text-gray-500" />
      ) : (
        <BookmarkFilledIcon className="h-4 w-4 text-gray-500" />
      )}
    </div>
  );
};

export default ProductSaved;
