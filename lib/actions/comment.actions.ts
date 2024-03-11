"use server";
import { CommentsType } from "@/types";
import { connectToDB } from "../database/mongoose";
import { Comments } from "../models/comments.model";
import mongoose from "mongoose";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export const addComment = async (commentData: {
  Product: mongoose.Types.ObjectId;
  User: mongoose.Types.ObjectId;
  Comment: string;
}) => {
  try {
    await connectToDB();
    const newComment = new Comments({
      Product: commentData.Product,
      User: commentData.User,
      Comment: commentData.Comment,
    });
    await newComment.save();
    console.log("Comment added successfully!");
  } catch (error) {
    console.error("Error inserting comment!:", error);
    throw error;
  }
};

export const listComments = async (productID: mongoose.Types.ObjectId) => {
  try {
    await connectToDB();
    const comments: CommentsType = await Comments.aggregate([
      {
        $match: { Product: productID },
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$User" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
            {
              $project: {
                Name: 1,
                Avatar: 1,
                Username: 1,
              },
            },
          ],
          as: "User",
        },
      },
      {
        $unwind: "$User",
      },
    ]);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const sendComment = async (
  formData: FormData,
  userdata: Session | null,
  productId: mongoose.Types.ObjectId | string,
) => {
  const comment = formData.get("content") as string;
  if (!userdata) {
    return redirect("/login", RedirectType.push);
  }
  try {
    if (comment.trim() !== "") {
      const newcomment = {
        Product: new mongoose.Types.ObjectId(productId),
        User: new mongoose.Types.ObjectId(userdata?.user?.id),
        Comment: comment,
      };
      await addComment(newcomment);
      revalidatePath(`/product/${productId}`);
    } else {
      throw new Error("Invalid user data or comment!");
    }
  } catch (error) {
    console.error("Error adding a comment:", error);
  }
};
