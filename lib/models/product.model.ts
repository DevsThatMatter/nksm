import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Total_Quantity_Available: {
        type: Number,
        required: true,
        min: [0, "Total_Quantity_Available must be non-negative"],
    },
    Product_Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        maxLength: [500, "Description should not exceed 500 characters"],
    },
    Price: {
        type: Number,
        required: true,
        min: [0, "Price must be non-negative"],
    },
    Images: {
        type: [String],
        validate: {
            validator: function (value: string) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "Images array must be non-empty",
        },
    },
    Category: {
        type: [String],
        enum: [
            "Biks",
            "Coolers",
            "Stationery",
            "Mattresses",
            "Kitchenware",
            "Instruments",
            "Electronics",
            "Miscellaneous",
        ],
        validate: {
            validator: function (value: string) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "Category array must be non-empty",
        },
    },
    expires_in: {
        type: Date,
    },
    is_archived: {
        type: Boolean,
        default: false,
    },
    Created_Timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    Updated_Timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema,"Product");

export default ProductModel;
