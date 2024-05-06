"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions/updateProfile.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loader from "../ui/loader";
import { RxPencil2 } from "react-icons/rx";
import { editProfileSchema } from "@/lib/validations/profile-schema";
import { Icons } from "@/app/utils/icons";

type FormFields = z.infer<typeof editProfileSchema>;

export default function AccountTab({ ...props }) {
  const [isEditing, setisEditing] = useState<boolean>(false);
  const form = useForm<FormFields>({
    defaultValues: {
      name: props.Name,
    },
    disabled: !isEditing,
    resolver: zodResolver(editProfileSchema),
  });

  const sendData: SubmitHandler<FormFields> = async (data) => {
    if (!isEditing) {
      setisEditing((prev) => !prev);
      return;
    }
    const { name } = data;
    const email = props.Email;
    const response = await updateProfile({ name, email });
    if (response?.error) {
      toast.error("Something went wrong");
      return;
    }
    setisEditing(false);
  };

  return (
    <div className="mt-10 flex w-11/12 scale-100 flex-col rounded-xl bg-[#EEF6FF] p-6 dark:bg-muted sm:w-3/5">
      <div className="relative -top-14 flex flex-col items-center justify-center gap-4 rounded-xl ">
        <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center sm:h-[6rem] sm:w-[6rem]">
          {props.Avatar ? (
            <Image
              src={props.Avatar}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full shadow-[0_7px_25px_-3px_rgba(0,0,0,0.3)] shadow-gray-500 dark:shadow-black md:h-full md:w-full"
            />
          ) : (
            <Icons.avatar className="h-24 w-24 rounded-full bg-muted p-[0.15rem]" />
          )}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendData)}>
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-[#DFF1FE] p-4 *:text-center *:text-base dark:bg-background/40 sm:items-start sm:*:text-start">
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
              className="relative mt-3 place-self-center p-5 sm:bottom-7 sm:-mb-6 sm:mt-3 sm:place-self-end"
              variant="outline"
              disabled={form.formState.isSubmitting}
            >
              {!isEditing ? (
                <>
                  Edit Profile <RxPencil2 className="ml-2" />
                </>
              ) : form.formState.isSubmitting ? (
                <>
                  <Icons.loading className="mr-2 animate-spin" /> Saving
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
