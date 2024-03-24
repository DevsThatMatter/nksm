"use server";
import { z } from "zod";
import { connectToDB } from "../database/mongoose";
import { User } from "../models/user.model";
import { revalidatePath } from "next/cache";
import { Product } from "../models/product.model";

const indianPhoneRegex: RegExp = /^(?:[6-9]\d{9})?$/;

const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain atleast 3 characters.")
    .max(30, "Name can only contain a maximum of 30 letters."),
  phone: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid mobile number.")
    .optional()
    .or(z.literal("")), // Allows for no phone numbers to exist, since phone numbers aren't fetched by default from GoogleProvider
});
type FormFields = z.infer<typeof editProfileSchema>;

type ProfileProps = {
  name: string;
  phone: string | undefined;
  email: string;
};

export const updateProfile = async (profileProps: ProfileProps) => {
  const { name, phone, email } = profileProps;

  try {
    const userInfo = await User.find({ Email: email });
    console.log(userInfo[0]);
    const userData = userInfo[0];

    const data = {
      name,
      phone,
    };
    const response = editProfileSchema.safeParse(data);
    if (!response.success) {
      var errorMsg = "";
      response.error.issues.forEach((issue) => {
        errorMsg += issue.path[0] + ": " + issue.message + ". ";
      });
      return {
        error: errorMsg,
      };
    }

    !userData && console.error("User not found.");

    if (userData.Name !== name) {
      userData.Name = name;
      console.log("Name updated.");
    }

    if (userData.Phone_Number !== phone) {
      userData.Phone_Number = phone;
      console.log("Phone number updated.");
    }
    await userData.save();
  } catch (e: unknown) {
    console.error("Error updating user information.", e);
    return;
  }
};
