import mongoose from "mongoose";

// Define the schema for the 'chat' collection
const chatSchema = new mongoose.Schema({
  Seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ProductId: { type: Number },
  Messages: { type: Array }, // Store messages as an array of objects [{Sender, Message, Timestamp}]
});

// Create the 'chat' model based on the schema
export const Chat = mongoose.model('Chat', chatSchema);