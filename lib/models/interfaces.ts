import { Types } from "mongoose";

export type Message = {
    Sender: string;
    Message: string;
    Timestamp?: Date;
};

export type Chat = {
    Seller: string;
    Buyer: string;
    ProductId: string;
    Messages: Message[];
    Created_Timestamp: Date;
    Updated_Timestamp: Date;
};

export type ProductInOrder = {
    Product_id: Types.ObjectId;
    Quantity: number;
};

export type Order = {
    Buyer: Types.ObjectId;
    Products_in_Order: ProductInOrder[];
    Total_Amount: number;
    Status: 'Pending' | 'Processing' | 'Delivered';
    Hostel_Name: string;
    Created_Timestamp: Date;
    Updated_Timestamp: Date;
};

export type Product = {
    Seller: Types.ObjectId;
    Total_Quantity_Available: number;
    Product_Name: string;
    Description?: string;
    Price: number;
    Images?: string[];
    Category?: string[];
    expires_in?: Date;
    is_archived?: boolean;
    Created_Timestamp: Date;
    Updated_Timestamp: Date;
};

export type Review = {
    Author: Types.ObjectId;
    Product: Types.ObjectId;
    Rating: number;
    Comment?: string;
    Created_Timestamp: Date;
    Updated_Timestamp: Date;
};

export type User = {
    First_Name: string;
    Last_Name: string;
    Password: string;
    Phone_Number: string;
    Avatar?: string | null;
    Email: string;
    Chat_IDs?: Types.ObjectId[];
    Owned_Products?: Types.ObjectId[];
    address: string;
    Ordered_Products?: Types.ObjectId[];
    Created_Timestamp: Date;
    Updated_Timestamp: Date;
};
