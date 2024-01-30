import mongoose from "mongoose";
import { CategoryEnum } from "@/types";

// Define the schema for the 'product' collection
const productSchema = new mongoose.Schema({
  Product_ID: { type: Number, required: true },
  Seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  Total_Quantity_Available: { type: Number, required: true },
  Product_Name: { type: String, required: true },
  Description: { type: String, required: true },
  Price: { type: Number, required: true },
  Images: [{ type: String }],
  Category: {
    type: String,
    enum: CategoryEnum,
    required: true,
  },
  expires_in: { type: Date },
  is_archived: { type: Boolean, default: false },
  Created_Timestamp: { type: Date },
  Updated_Timestamp: { type: Date },
});

// Create the 'product' model based on the schema
export const Product = mongoose.model('Product', productSchema);
