"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function AddListing({
  children = (
    <Button variant="default" className="relative">
      <Icons.add className="absolute bottom-0 left-2 top-0 m-auto h-5 w-5" />
      <span className="hidden pl-4 sm:inline-block"> Add Listing </span>
    </Button>
  ),
}: {
  children?: React.ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    console.log("triggered");
    if (isDialogOpen) {
      setIsDialogOpen(false);
    } else {
      setIsDialogOpen(true);
    }
  };

  // Define the content for each step
  return (
    <Dialog onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">
              Item Name
            </label>
            <Input
              className="rounded border p-3"
              placeholder="Acoustic Guitar"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">
              Condition
            </label>
            <Select>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Like New" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" col-span-2 flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">
              Description
            </label>
            <Textarea
              className="h-24 rounded border p-3"
              placeholder="Cool Guitar"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Price</label>
            <Input className="rounded border p-3" placeholder="8000" />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Category</label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Instruments" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="instruments">Instruments</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="music">Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold text-gray-700">Image</label>
            <Input className="rounded border p-1" type="file" />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Button className="rounded px-4 py-2 font-bold">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
