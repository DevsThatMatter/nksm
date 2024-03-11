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
import { FileState, MultiImageDropzone } from "../ui/multi-image-dropdown";
import { useEdgeStore } from "@/app/utils/edgestore";

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

  function handleReset() {
    form.reset();
  }
  function hidePreview() {
    setIsPreview(null);
  }

  function showPreview(data: PreviewInputs) {
    setIsPreview(data);
  }

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
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
                          key={field.value}
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
                          defaultValue={field.value}
                          key={field.value}
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
                          key={field.value}
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
                        <MultiImageDropzone
                          value={fileStates}
                          dropzoneOptions={{
                            maxFiles: 6,
                          }}
                          onChange={(files) => {
                            setFileStates(files);
                          }}
                          onFilesAdded={async (addedFiles) => {
                            setFileStates([...fileStates, ...addedFiles]);
                            await Promise.all(
                              addedFiles.map(async (addedFileState) => {
                                try {
                                  console.log(addedFileState);
                                  const res =
                                    await edgestore.publicImages.upload({
                                      file: addedFileState.file as File,
                                      input: { category: "profile" },
                                      options: { temporary: true },
                                      onProgressChange: async (progress) => {
                                        updateFileProgress(
                                          addedFileState.key,
                                          progress,
                                        );
                                        if (progress === 100) {
                                          // wait 1 second to set it to complete
                                          // so that the user can see the progress bar at 100%
                                          await new Promise((resolve) =>
                                            setTimeout(resolve, 1000),
                                          );
                                          updateFileProgress(
                                            addedFileState.key,
                                            "COMPLETE",
                                          );
                                        }
                                      },
                                    });
                                  console.log(res);
                                  field.onChange([...field.value, res.url]);
                                  console.log(field.value);
                                } catch (err) {
                                  updateFileProgress(
                                    addedFileState.key,
                                    "ERROR",
                                  );
                                }
                              }),
                            );
                          }}
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
