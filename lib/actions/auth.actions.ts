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
    const existingUser = await User.findOne({ Email: data.Email });
    if (existingUser) {
      return existingUser._id;
    }
    const newUser = new User(data);
    await newUser.save();
    return newUser._id;
  } catch (error) {
    console.error("Error inserting a user!:", error);
    throw error;
  }
};
export const getUser = async (email: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ Email: email }).orFail();
    return user;
  } catch (error) {
    console.error("Error user not found!:", error);
    throw error;
  }
};
