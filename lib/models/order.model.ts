import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    Buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: function (value: string) {
                return mongoose.Types.ObjectId.isValid(value);
            },
            message: "Invalid User_ID format",
        },
    },
    Products_in_Order: [{
        Product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            validate: {
                validator: function (value: string) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: "Invalid Product_ID format",
            },
        },
        Quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
        },
    }],
    Total_Amount: {
        type: Number,
        required: true,
        min: [0, 'Total_Amount cannot be negative'],
    },
    Status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered'],
        default: 'Pending',
    },
    Hostel_Name: {
        type: String,
        required: true,
        min: [1, 'Hostel_Name must be a string'],
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

const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema,"Order");

export default OrderModel;
