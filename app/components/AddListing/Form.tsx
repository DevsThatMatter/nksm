"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "../ui/input";
import { FormDataSchema } from "@/lib/FormSchema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ConditionEnum } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
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
} from "@radix-ui/react-select";
import Link from "next/link";

type Inputs = z.infer<typeof FormDataSchema>;

export default function AddListingForm() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>({
  //   resolver: zodResolver(FormDataSchema),

  // });

  // const processForm: SubmitHandler<Inputs> = (data) => {
  //   console.log(data);
  // };

  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      iname: "",
      condition: "",
      Description: "",
      images: [],
      Price: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormDataSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField //item name
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
          <FormField //description
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField // images
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" multiple />
                </FormControl>
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {Object.values(ConditionEnum)
                      .filter((value) => typeof value === "string")
                      .map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  What is the condition of your item?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
