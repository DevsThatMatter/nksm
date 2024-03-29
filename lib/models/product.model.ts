import mongoose from "mongoose";
import { CategoryEnum, ConditionEnum } from "@/types";

// Define the schema for the 'product' collection
const productSchema = new mongoose.Schema(
  {
    Seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Total_Quantity_Available: { type: Number, required: true },
    Product_Name: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true },
    Images: [{ type: String }],
    Condition: {
      type: String,
      enum: ConditionEnum,
      required: true,
    },
    Category: {
      type: String,
      enum: CategoryEnum,
      required: true,
    },
    Negotiable: { type: Boolean, default: true },
    expires_in: { type: Date, default: () => Date.now() + 604800000 }, // 7days from when field is created
    is_archived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Create the 'product' model based on the schema
export const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");
