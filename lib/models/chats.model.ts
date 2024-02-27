import mongoose from "mongoose";

// Define the schema for the 'chat' collection
const chatSchema = new mongoose.Schema({
  Seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  Buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ProductId: { type: mongoose.Schema.Types.ObjectId,ref:'product' }, // Use Mongoose String type
  Messages: { type: [mongoose.Schema.Types.ObjectId],ref:'messages' }, // Store messages as an array of objects [{Sender, Message, Timestamp}]
});

// Create the 'chat' model based on the schema
export const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema,"chats");
