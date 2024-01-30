import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const chatSchema = new mongoose.Schema(
    {
        Seller: {
            type: [ObjectId],
            ref: 'User',
            required: true,
            validate: {
                validator: function (value: string) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid ObjectID for User_ID'
            }
        },
        Buyer: {
            type: [ObjectId],
            ref: 'User',
            required: true,
            validate: {
                validator: function (value: string) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid ObjectID for User_ID'
            }
        },
        ProductId: {
            type: ObjectId,
            ref: 'Product',
            required: true,
            validate: {
                validator: function (value: string) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid ObjectID for Product_ID'
            }
        },
        Messages: [
            {
                Sender: {
                    type: ObjectId,
                    ref: 'User',
                    required: true,
                },
                Message: {
                    type: String,
                    required: true,
                },
                Timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        Created_Timestamp: {
            type: Date,
            default: Date.now,
        },
        Updated_Timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const ChatModel = mongoose.models.Chat || mongoose.model('Chat', chatSchema, "Chat");

export default ChatModel;
