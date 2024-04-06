import mongoose, { Model, Types } from "mongoose";

export interface IComment {
  Product: Types.ObjectId;
  User: Types.ObjectId;
  Comment: string;
}

const commentSchema = new mongoose.Schema<IComment>({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Comment: { type: String, required: true },
});

export const Comments: Model<IComment> =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);
