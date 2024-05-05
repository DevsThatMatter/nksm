"use client";
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
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../ui/button";
import { removeProduct } from "@/lib/actions/products.actions";
const DialogOptions = ({ id }: { id: string }) => {
  const handleRemoval = async (productId: string) => {
    await removeProduct(productId);
    location.reload();
  };
  const handleEdit = async (productId: string) => {
    console.log(productId);
  };
  return (
    <>
      <Button
        className="cursor-pointer sm:absolute sm:bottom-2 sm:right-16"
        variant="ghost"
        size="icon"
        onClick={() => handleEdit(id)}
      >
        <MdEdit
          size={28}
          className="text-foreground max-sm:hidden"
          title="Edit your product"
        />
        <p className="sm:hidden">Edit</p>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer sm:absolute sm:bottom-2 sm:right-4"
            variant="ghost"
            size="icon"
          >
            <MdDelete
              size={28}
              className="text-red-500 max-sm:hidden"
              title="Remove your product"
            />
            <p className="text-red-500 sm:hidden">Remove</p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">No</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => handleRemoval(id)}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogOptions;
