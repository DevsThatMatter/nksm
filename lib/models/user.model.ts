import mongoose, { Model, Types } from "mongoose";

export interface IUser {
  Username: string;
  Name: string;
  Phone_Number?: string;
  Avatar?: string;
  Email: string;
  Chat_IDs?: [Types.ObjectId];
  Owned_Products?: [Types.ObjectId];
  Address?: string;
  Ordered_Products?: [Types.ObjectId];
  Comments?: [Types.ObjectId];
}
const userSchema = new mongoose.Schema<IUser>({
  Username: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Phone_Number: { type: String },
  Avatar: { type: String },
  Email: { type: String, required: true },
  Chat_IDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat" }],
  Owned_Products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  Address: { type: String },
  Ordered_Products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  Comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
