"use server";
import { User } from "../models/user.model";
import { editProfileSchema } from "../validations/profile-schema";

type ProfileProps = {
  name: string;
  email: string;
};

export const updateProfile = async (profileProps: ProfileProps) => {
  const { name, email } = profileProps;

  try {
    const userInfo = await User.find({ Email: email });
    console.log(userInfo[0]);
    const userData = userInfo[0];

    const response = editProfileSchema.safeParse({ name });
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
    await userData.save();
  } catch (e: unknown) {
    console.error("Error updating user information.", e);
    return;
  }
};
