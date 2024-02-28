import { CommentsInterface, CommentsType } from "@/types";
import { connectToDB } from "../database/mongoose";
import { Comments } from "../models/comments.model";
import mongoose from "mongoose";

export const addComment = async (commentData: {
  Product: mongoose.Types.ObjectId;
  User: mongoose.Types.ObjectId;
  Comment: string;
}) => {
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

export const listComments = async (productID: string) => {
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
    console.log(comments);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
