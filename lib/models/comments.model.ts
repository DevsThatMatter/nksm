import mongoose from "mongoose";
import { string } from "zod";

const commentSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Comment: { type: string, required: true },
});

export const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);
