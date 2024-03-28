"use client";
import PencilIcon from "../ui/PencilIcon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { updateProfile } from "@/lib/actions/updateProfile.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import RadixPencil from "../ui/radixpencil";

const indianPhoneRegex: RegExp = /^(?:[6-9]\d{9})?$/;

type FormFields = z.infer<typeof editProfileSchema>;
const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain atleast 3 characters.")
    .max(30, "Name can only contain a maximum of 30 letters."),
  phone: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid mobile number.")
    .optional()
    .or(z.literal("")), //Allows for no phone numbers to exist, since phone numbers aren't fetched by default from GoogleProvider
});

export default function AccountTab({ ...props }) {
  const [isEditing, setisEditing] = useState<boolean>(false);
  const form = useForm<FormFields>({
    defaultValues: {
      name: props.Name,
      phone: props.Phone,
    },
    disabled: !isEditing,
    resolver: zodResolver(editProfileSchema),
  });

  const sendData: SubmitHandler<FormFields> = async (data) => {
    if (!isEditing) {
      setisEditing((prev) => !prev);

      return;
    }
    const { name, phone } = data;
    const email = props.Email;
    const response = await updateProfile({ name, phone, email });
    if (response?.error) {
      alert(`Something went wrong:\n ${response.error}`);
      console.log(data);
      return;
    }
    setisEditing(false);
  };

  return (
    <div className="mt-10 flex w-11/12 scale-100 flex-col rounded-xl bg-[#EEF6FF] p-6 dark:bg-[#152451] sm:w-3/5">
      <div className="relative -top-14 flex flex-col items-center justify-center gap-4 rounded-xl ">
        <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center sm:h-[6rem] sm:w-[6rem]">
          <Image
            src={
              props.Avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="Profile picture"
            width={100}
            height={100}
            className=" rounded-full shadow-[0_7px_25px_-3px_rgba(0,0,0,0.3)] shadow-gray-500 dark:shadow-black md:h-full md:w-full"
          />
        </div>
        <Button
          className={` ${isEditing ? "block" : "hidden"} ml-0 mt-2 sm:ml-1 sm:mt-2`}
          variant="secondary"
          size="lg"
        >
          Change
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendData)}
          className="relative flex flex-col items-center justify-center gap-4 rounded-xl bg-[#DFF1FE] p-4 *:text-center *:text-base dark:bg-[#16213E] sm:items-start sm:*:text-start"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="ml-2 mt-2 w-full *:text-base">
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input
                    className={`w-full border-slate-500 text-center disabled:border-0 disabled:font-bold sm:w-3/5 sm:text-start`}
                    placeholder="Full Name"
                    disabled={!isEditing || form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="ml-2 w-full *:text-base">
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input
                    className={`w-full border-slate-500 text-center disabled:border-0 disabled:font-bold sm:w-3/5 sm:text-start`}
                    placeholder="Add a phone number"
                    disabled={!isEditing || form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="ml-2 w-full *:text-base">
                <FormLabel>Email:</FormLabel>
                <Input
                  className={`${!isEditing && "border-0"} w-full border-slate-600 text-center disabled:font-bold sm:w-3/5 sm:text-start`}
                  placeholder="Email"
                  type="email"
                  value={props.Email}
                  name="email"
                  disabled
                />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-5 place-self-center p-5 sm:mt-3 sm:place-self-end"
            variant="outline"
            disabled={form.formState.isSubmitting}
          >
            {!isEditing ? (
              <>
                Edit Profile <RadixPencil className="ml-2" />
              </>
            ) : form.formState.isSubmitting ? (
              "Saving..."
            ) : (
              "Save Profile"
            )}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}
