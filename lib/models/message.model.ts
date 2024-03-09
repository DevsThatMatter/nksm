import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  Sender: String,
  Message: String,
  options: Boolean,
  FileUrl: String,
  TimeStamp: String,
  accepted: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
  },
  readStatus: Boolean,
});

export const Message =
  mongoose.models.Message ||
  mongoose.model("Message", messageSchema, "messages");
