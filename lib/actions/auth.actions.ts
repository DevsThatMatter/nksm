import { redirect } from "next/navigation";
import { connectToDB } from "../database/mongoose";
import { User } from "../models/user.model";

interface userData {
  Username: string;
  Name: string;
  Email: string;
  Avatar: string;
}
export const insertUser = async (data: userData) => {
  try {
    await connectToDB();
    const existingUser = (await User.findOne({
      Email: data.Email,
    })
      .select("_id")
      .lean()) as { _id: string } | null;
    console.log("existingUser", existingUser);
    if (existingUser) return;
    const newUser = new User(data);
    await newUser.save();
    return;
  } catch (error) {
    console.error("Error inserting a user!:", error);
    throw error;
  }
};

export const getUser = async (email: string) => {
  try {
    await connectToDB();
    const user = (await User.findOne({ Email: email })
      .select("_id Avatar Email")
      .lean()
      .orFail()) as { _id: string; Avatar: string; Email: string };
    return user;
  } catch (error) {
    console.error("Error user not found!:", error);
    redirect("/login");
  }
};
