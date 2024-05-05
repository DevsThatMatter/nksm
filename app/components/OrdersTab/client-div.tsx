"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { removeProduct } from "@/lib/actions/products.actions";
import { ReactNode } from "react";

const ClientDiv = ({ children, id }: { children: ReactNode; id: string }) => {
  const handleRemoval = async (productId: string) => {
    await removeProduct(productId);
    location.reload();
  };
  const handleEdit = async (productId: string) => {
    console.log(productId);
  };
  return (
    <div className="relative">
      {children}
      <div
        className="absolute bottom-2 right-4 cursor-pointer"
        onClick={() => handleRemoval(id)}
      >
        <MdDelete
          size={28}
          className="text-red-600"
          title="Remove your product"
        />
      </div>
      <div
        className="absolute bottom-2 right-16 cursor-pointer"
        onClick={() => handleEdit(id)}
      >
        <MdEdit
          size={28}
          className="text-foreground"
          title="Edit your product"
        />
      </div>
    </div>
  );
};

export default ClientDiv;
