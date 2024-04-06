import { MessageStatusEnum } from "@/types";
import mongoose, { Model } from "mongoose";

export interface IMessage {
  Sender: string;
  Message: string;
  options: boolean;
  TimeStamp: string;
  accepted?: keyof typeof MessageStatusEnum;
  readStatus: boolean;
}
const messageSchema = new mongoose.Schema<IMessage>({
  Sender: String,
  Message: String,
  options: Boolean,
  TimeStamp: String,
  accepted: {
    type: String,
    enum: MessageStatusEnum,
  },
  readStatus: Boolean,
});

export const Message: Model<IMessage> =
  mongoose.models.Message ||
  mongoose.model("Message", messageSchema, "messages");
