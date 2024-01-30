import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
    Comment: {
        type: String,
        maxLength: [500, "Comment should not exceed 500 characters"],
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

const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema,"Review");

export default ReviewModel;
