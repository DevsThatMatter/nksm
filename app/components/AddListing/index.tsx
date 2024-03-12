"use client";
import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormDataSchema } from "@/lib/FormSchema/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CategoryEnum, ConditionEnum, NegotiateEnum } from "@/types";
import { z } from "zod";
import { FileState, MultiImageDropzone } from "../ui/multi-image-dropdown";
import { useEdgeStore } from "@/app/utils/edgestore";
import { Card, CardContent } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import AddListingPreview from "./AddListingPreview";
import { addProductFromListing } from "@/lib/actions/add-listing.action";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export type PreviewInputs = z.infer<typeof FormDataSchema>;

export function AddListing() {
  const [currentStep, setCurrentStep] = useState<number>(1);
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
    mode: "onBlur",
  });
  type FieldName = keyof PreviewInputs;
  const field = [
    ["iname", "description"],
    ["quantity", "category"],
    ["price", "negotiate", "condition"],
    [],
  ];
  const next = async () => {
    console.log(currentStep);
    if (currentStep < 4) {
      const fields = field[currentStep - 1];
      const output = await form.trigger(fields as FieldName[], {
        shouldFocus: true,
      });

      if (!output) return;
      console.log("dfsf");

      setCurrentStep((step) => step + 1);
    } else {
      await form.handleSubmit(onSubmit)();
      console.log("hi");
    }
  };
  async function onSubmit(data: PreviewInputs) {
    const {
      iname,
      quantity,
      category,
      description,
      price,
      condition,
      images,
      negotiate,
    } = data;
    console.log("gsddsfg");
    const id = await addProductFromListing({
      iname,
      quantity,
      category,
      description,
      price,
      images,
      negotiate: negotiate === "Yes" ? true : false,
      condition,
      userId: "65c5e979afe71c6df760f704",
    });
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

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
  const uploadFiles = async (addedFiles: FileState[]) => {
    return await Promise.all(
      addedFiles.map(async (addedFileState) => {
        try {
          console.log(addedFileState);
          const res = await edgestore.publicImages.upload({
            file: addedFileState.file as File,
            input: { category: "profile" },
            options: { temporary: true },
            onProgressChange: async (progress) => {
              updateFileProgress(addedFileState.key, progress);
              if (progress === 100) {
                // wait 1 second to set it to complete
                // so that the user can see the progress bar at 100%
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(addedFileState.key, "COMPLETE");
              }
            },
          });
          console.log(res);
          return res.url;
        } catch (err) {
          updateFileProgress(addedFileState.key, "ERROR");
        }
      }),
    );
  };
  return (
    <>
      <DialogHeader>
        <div>{`Step ${currentStep} of 4.`}</div>
        <DialogTitle>Add Listing</DialogTitle>
        <DialogDescription>
          Provide details for your new listing.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="my-2 grid grid-cols-2">
          {currentStep === 1 ? (
            <>
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
            </>
          ) : currentStep === 2 ? (
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
          ) : currentStep === 4 ? (
            <AddListingPreview {...form.getValues()} />
          ) : (
            <>
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
                            setCurrentStep(9);
                            setFileStates([...fileStates, ...addedFiles]);
                            field.onChange([
                              ...field.value,
                              ...(await uploadFiles(addedFiles)),
                            ]);
                            setCurrentStep(3);
                            console.log("hsdfj");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </form>
      </Form>
      <div className="flex justify-between">
        <Button type="button" onClick={prev} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={next} disabled={currentStep > 4}>
          {currentStep === 4 ? "submit" : "Next"}
        </Button>
      </div>
    </>
  );
}
