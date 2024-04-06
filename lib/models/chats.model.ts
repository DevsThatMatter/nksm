import { ChatStatusEnum } from "@/types";
import mongoose, { Model, Types } from "mongoose";

export interface IChat {
  Seller: Types.ObjectId;
  Buyer: Types.ObjectId;
  ProductId: Types.ObjectId;
  Messages: Types.ObjectId[];
  status: keyof typeof ChatStatusEnum;
}
const chatSchema = new mongoose.Schema<IChat>({
  Seller: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  Buyer: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  }, // Use Mongoose String type
  Messages: { type: [mongoose.Schema.Types.ObjectId], ref: "messages" }, // Store messages as an array of objects [{Sender, Message, Timestamp}]
  status: {
    type: String,
    enum: ChatStatusEnum,
    required: true,
  },
});

// Create the 'chat' model based on the schema
export const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema, "chats");
