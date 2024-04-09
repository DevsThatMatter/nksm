import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  Saved_Products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
