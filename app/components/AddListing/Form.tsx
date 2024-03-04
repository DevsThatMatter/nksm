"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "../ui/input";

import { FormDataSchema } from "@/lib/FormSchema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryEnum, ConditionEnum, NegotiateEnum } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Session } from "next-auth";
import ListingPreview from "./ListingPreview";

export type PreviewInputs = z.infer<typeof FormDataSchema>;

export default function AddListingForm({ userData }: { userData: Session }) {
  const [isPreview, setIsPreview] = useState<PreviewInputs | null>(null);
  const form = useForm<
    Omit<PreviewInputs, "price"> & { price: number | string },
    void,
    PreviewInputs
  >({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      iname: "",
      quantity: 1,
      category: "",
      description: "",
      price: "",
      condition: "",
      images: [],
      negotiate: "Yes",
    },
  });
  const category = form.watch("category");
  const condition = form.watch("condition");

  function handleReset() {
    form.reset();
  }
  function hidePreview() {
    setIsPreview(null);
  }

  function showPreview(data: PreviewInputs) {
    setIsPreview(data);
  }

  return (
    <div className="flex h-[85vh] items-center justify-center">
      <div className="max-w-md rounded-md border p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(showPreview)}>
            <div className="my-2 grid grid-cols-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="iname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-x-3">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantity"
                            type="number"
                            min="1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          key={category}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(CategoryEnum).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="col-span-2 mb-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about your product"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 mb-2">
                <div className="mb-2 grid grid-cols-3 gap-x-3">
                  <FormField //price
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField // negotiate
                    control={form.control}
                    name="negotiate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Negotiable</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={"Yes"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(NegotiateEnum).map((negotiate) => (
                              <SelectItem key={negotiate} value={negotiate}>
                                {negotiate}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField // condition
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          key={condition}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(ConditionEnum).map((condition) => (
                              <SelectItem key={condition} value={condition}>
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className=" col-span-2 mb-2">
                <FormField // images
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 mt-5 flex justify-between space-x-3">
                <Button
                  type="reset"
                  variant="outline"
                  className="w-full hover:border-red-500"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button variant="outline" type="submit">
                  Preview
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {isPreview && (
        <ListingPreview
          data={isPreview}
          userId={userData.user?.id as string}
          hidePreview={hidePreview}
        />
      )}
    </div>
  );
}

function ChevronRightIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
