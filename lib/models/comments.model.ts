import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Comment: { type: String, required: true },
});

export const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);
