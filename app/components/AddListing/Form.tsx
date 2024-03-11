"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "../ui/input";

import { FormDataSchema } from "@/lib/FormSchema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryEnum, ConditionEnum, Negotiate, NegotiateEnum } from "@/types";
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

export default function AddListingForm({
  userData,
}: {
  userData: Session | null;
}) {
  const [isPreview, setIsPreview] = useState(false);
  const form = useForm<Inputs>({
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
    <div className="flex justify-center items-center h-[85vh]">
      <div className="border p-8 max-w-md rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePreview)}>
            <div className="grid grid-cols-2 my-2">
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
                <div className="grid grid-cols-3 mb-2 gap-x-3">
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
                        <Select onValueChange={field.onChange} defaultValue={"Yes"}>
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
              <div className="flex justify-between col-span-2 mt-5 space-x-3">
                <Button
                  type="reset"
                  variant="outline"
                  className="w-full hover:border-red-500"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" type="submit">
                      Preview
                    </Button>
                  </AlertDialogTrigger>
                  {isPreview ? (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          This is how your product will be displayed:
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You can still make the changes after previewing
                        </AlertDialogDescription>
                        <Card>
                          <CardContent className="relative flex items-start gap-6 p-6 @container">
                            <div className="">
                              <Image
                                alt="Product Image"
                                className="aspect-square overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
                                height={200}
                                src={
                                  form.getValues().images.length > 0
                                    ? URL.createObjectURL(
                                        form.getValues().images[0]
                                      )
                                    : ""
                                }
                                width={200}
                              />
                            </div>
                            <div className="grid gap-2 text-base">
                              <h2 className="font-extrabold leading-tight md:text-xl max-w-48 line-clamp-2 overflow-ellipsis">
                                {form.getValues().iname}
                              </h2>
                              <p className="text-base leading-normal max-w-48 overflow-ellipsis line-clamp-3">
                                {form.getValues().description}
                              </p>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold">
                                  ₹{form.getValues().price}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <ChevronRightIcon className="h-5 w-5 fill-muted" />
                                <span className="text-sm text-muted-foreground">
                                  {form.getValues().condition}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsPreview(false)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => onSubmit()}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  ) : (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Incomplete Product Listing
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Some fields are missing, please fill all the fields to
                          continue
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Return</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
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
