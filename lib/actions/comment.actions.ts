import { CommentsInterface } from "@/types";
import { connectToDB } from "../database/mongoose";
import { Comments } from "../models/comments.model";

export const addComment = async (commentData: CommentsInterface) => {
  try {
    console.log(commentData);
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
