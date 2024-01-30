import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        First_Name: {
            type: String,
            required: true,
        },
        Last_Name: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    const passwordRegex =
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;
                    return passwordRegex.test(value);
                },
                message: "Invalid password format",
            },
        },
        Phone_Number: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    const phoneRegex = /^\d{10}$/;
                    return phoneRegex.test(value);
                },
                message: "Invalid phone number format",
            },
        },
        Avatar: {
            type: String,
            default: null,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value: string) {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return emailRegex.test(value);
                },
                message: "Invalid email format",
            },
        },
        Chat_IDs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat",
                validate: {
                    validator: function (value: string) {
                        return mongoose.Types.ObjectId.isValid(value);
                    },
                    message: "Invalid Chat_ID format",
                },
            },
        ],
        Owned_Products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                validate: {
                    validator: function (value: string) {
                        return mongoose.Types.ObjectId.isValid(value);
                    },
                    message: "Invalid Owned_Products format",
                },
            },
        ],
        Address: {
            type: String,
            required: true,
        },
        Ordered_Products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                validate: {
                    validator: function (value: string) {
                        return mongoose.Types.ObjectId.isValid(value);
                    },
                    message: "Invalid Ordered_Products format",
                },
            },
        ],
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
    },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema,"User");

export default UserModel;
