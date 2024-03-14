"use client";
import PencilIcon from "../ui/PencilIcon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { User } from "next-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

const indianPhoneRegex: RegExp = /^(?:[6-9]\d{9})?$/;

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must contain atleast 3 characters.")
    .max(30, "Name can only contain a maximum of 30 letters."),
  phone: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid mobile number.")
    .optional()
    .or(z.literal("")),
});

type FormFields = z.infer<typeof schema>;

export default function AccountTab({
  userData,
}: {
  userData: User | undefined;
}) {
  const [isEditing, setisEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: userData?.name?.trim(),
    },
    resolver: zodResolver(schema),
  });

  const sendData: SubmitHandler<FormFields> = (data) => {
    if (errors.name || errors.phone) setisEditing(true);
    else {
      isEditing && console.log(data);
      setisEditing(!isEditing);
    }
  };
  return (
    <div className="space-y-7">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center sm:h-16 sm:w-16">
          <Image
            src={
              userData
                ? userData?.image!
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="Profile picture"
            width={100}
            height={100}
            className="rounded-full md:h-full md:w-full"
          />
        </div>
        <Button className="ml-0 mt-2 sm:ml-1 sm:mt-0" variant="secondary">
          Change
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(sendData)}
        className="flex flex-col items-center justify-center gap-5 sm:items-start sm:px-0"
      >
        <Input
          {...register("name")}
          className={`w-4/5 sm:lg:w-1/3 ${errors.name && "ring-2 !ring-red-500"}`}
          placeholder="Full Name"
          type="text"
          disabled={!isEditing}
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}

        <Input
          className="w-4/5 sm:lg:w-1/3"
          placeholder="Email"
          type="email"
          value={userData?.email?.trim()}
          disabled
        />

        <Input
          {...register("phone")}
          className={`w-4/5 sm:lg:w-1/3 ${errors.phone && "ring-2 !ring-red-500"}`}
          placeholder="Add a phone number"
          type="text"
          disabled={!isEditing}
        />
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}

        <Button
          type="submit"
          className="mt-5 w-4/5 place-self-center sm:place-self-start sm:lg:w-1/3"
          variant="secondary"
        >
          {!isEditing ? "Edit" : "Save"} Profile
        </Button>
      </form>
    </div>
  );
}
