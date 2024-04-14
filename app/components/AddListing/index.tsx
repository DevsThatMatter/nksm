"use client";
import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormDataSchema } from "@/lib/validations/listing-schema";
import Dropzone from "react-dropzone";
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
import { CategoryEnum, ConditionEnum, NegotiateEnum } from "@/types";
import { z } from "zod";
import { useEdgeStore } from "@/app/utils/edgestore";
import AddListingPreview from "./add-listing-preview";
import { addProductFromListing } from "@/lib/actions/add-listing.action";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { cn } from "@/app/utils";
import Compressor from "compressorjs";
import { Icons } from "@/app/utils/icons";

export type PreviewInputs = z.infer<typeof FormDataSchema>;

export function AddListing() {
  const { edgestore } = useEdgeStore();
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
      price: "100",
      condition: "Brand New",
      images: [],
      negotiate: "Yes",
    },
    mode: "onBlur",
  });
  type FieldName = keyof PreviewInputs;
  const field = [
    ["iname", "description"],
    ["quantity", "category"],
    ["price", "negotiate", "condition", "images"],
    [],
  ];
  const next = async () => {
    console.log(currentStep);
    if (currentStep < 4) {
      const fields = field[currentStep - 1];
      const output = await form.trigger(fields as FieldName[]);

      if (!output) return;
      console.log("dfsf");

      setCurrentStep((step) => step + 1);
    } else {
      await form.handleSubmit(onSubmit)();
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
    const resImageUrls = await Promise.all(
      images.map(
        async (image) =>
          await edgestore.publicImages
            .upload({
              file: image,
              input: { category: "profile" },
              options: { temporary: true },
              onProgressChange: async (progress) => {
                if (progress === 100) {
                  return;
                }
              },
            })
            .then((res) => res.url),
      ),
    );
    await addProductFromListing({
      iname,
      quantity,
      category,
      description,
      price,
      images: resImageUrls,
      negotiate: negotiate === "Yes" ? true : false,
      condition,
    });
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      {currentStep === 4 ? (
        <>
          <DialogTitle className="mb-0 text-xl">Preview</DialogTitle>
        </>
      ) : (
        <>
          <DialogHeader>
            <div>{`Step ${currentStep} of 4.`}</div>
            <DialogTitle>Add Listing</DialogTitle>
            <DialogDescription>
              Provide details for your new listing.
            </DialogDescription>
          </DialogHeader>
        </>
      )}
      <Form {...form}>
        <form className="my-2 grid grid-cols-2">
          {currentStep === 1 ? (
            <>
              <div className="col-span-2 mb-2">
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
                        <AutosizeTextarea
                          rows={4}
                          minHeight={100}
                          placeholder="Tell us a bit about your product"
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
                  key={"quantity"}
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
                  key="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        key="categorySelect"
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
            <div className="col-span-2 ">
              <AddListingPreview {...form.getValues()} />
            </div>
          ) : (
            <>
              <div className="col-span-2 mb-2">
                <div className="mb-2 grid grid-cols-3 gap-x-3">
                  <FormField //price
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input {...field} key={"price"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField // condition
                    control={form.control}
                    name="condition"
                    key="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          key="conditionSelect"
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
                  <FormField // negotiate
                    control={form.control}
                    name="negotiate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Negotiable</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                        <>
                          <Dropzone
                            accept={{
                              "image/*": [".jpg", ".jpeg", ".png"],
                            }}
                            onDropAccepted={async (acceptedFiles) => {
                              const compressedFiles = await Promise.all(
                                acceptedFiles.map((file) => {
                                  return new Promise((resolve, reject) => {
                                    new Compressor(file, {
                                      quality: 0.6,
                                      success(result: File) {
                                        resolve(result);
                                      },
                                      error(err: any) {
                                        reject(err);
                                      },
                                    });
                                  });
                                }),
                              );
                              console.log(compressedFiles);
                              field.onChange([
                                ...field.value,
                                ...compressedFiles,
                              ]);
                            }}
                            disabled={field.value.length >= 6}
                            multiple={true}
                            maxSize={5242880}
                            maxFiles={6}
                            onError={(err) => form.setError("images", err)}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps({
                                  className: cn(
                                    "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md cursor-pointer border border-dashed border-muted",
                                    field.value.length >= 6 && "bg-muted",
                                  ),
                                })}
                              >
                                <Icons.upload className="mt-4 size-8 text-muted-foreground" />
                                <div className="mb-2 mt-5 flex items-center gap-x-3">
                                  <label
                                    htmlFor="Products"
                                    className={`text-md cursor-pointer font-semibold text-muted-foreground focus:underline focus:outline-none ${
                                      form.formState.errors.images &&
                                      "text-red-500"
                                    }`}
                                    tabIndex={0}
                                  >
                                    Click Here to Upload Images...
                                    <input {...getInputProps()} />
                                  </label>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          {field.value.map((file: File, index: number) => (
                            <div
                              key={index}
                              className="flex h-14 w-full items-center gap-5 rounded-md border p-1"
                            >
                              <Image
                                src={URL.createObjectURL(file)}
                                alt="Product Image"
                                width={100}
                                height={100}
                                className="aspect-square h-full w-12 rounded-md object-cover"
                              />
                              <p className="grow px-1 text-sm">{file.name}</p>
                              <Button
                                onClick={() =>
                                  field.onChange(
                                    field.value.filter((_, i) => i !== index),
                                  )
                                }
                                variant="ghost"
                                className="m-1 h-10 w-10 border p-1"
                              >
                                <Icons.cross />
                              </Button>
                            </div>
                          ))}
                        </>
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
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          disabled={currentStep === 1 || form.formState.isSubmitting}
          className="w-20"
        >
          Previous
        </Button>
        <Button
          onClick={next}
          disabled={currentStep > 4 || form.formState.isSubmitting}
          className="w-20 overflow-x-visible px-2"
        >
          {form.formState.isSubmitting ? (
            <Icons.loading className="animate-spin text-muted" />
          ) : (
            <>{currentStep === 4 ? "Submit" : "Next"}</>
          )}
        </Button>
      </div>
    </>
  );
}
