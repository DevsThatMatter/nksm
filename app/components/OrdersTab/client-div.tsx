"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import { removeProduct } from "@/lib/actions/products.actions";
import { ReactNode } from "react";
import { Button } from "../ui/button";

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
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute bottom-2 right-4 cursor-pointer">
            <MdDelete
              size={28}
              className="text-red-500"
              title="Remove your product"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={() => handleRemoval(id)}>
              Yes
            </Button>
            <DialogClose asChild>
              <Button variant="outline">No</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
