import { Types } from "mongoose";

type ConditionEnum = 'new' | 'used';
type CategoryEnum = 'electronics' | 'clothing' | 'books';

export interface IProduct {
    _id: Types.ObjectId
    Seller: Types.ObjectId;
    Total_Quantity_Available: number;
    Product_Name: string;
    Description: string;
    Price: number;
    Images: string[];
    Condition: ConditionEnum;
    Category: CategoryEnum;
    expires_in?: Date;
    is_archived: boolean;
}
interface messageType{
    Sender:string,
    Message?:string,
    FileUrl?:string
    TimeStamp?:string
}
export interface IChat{
    save(): unknown;
    Seller:string,
    Buyer:string,
    ProductId:string,
    Messages:Array<messageType>
}