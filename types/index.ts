import { ObjectId, Types } from "mongoose";

export type category = {
  name: string;
  imgUrl: string;
  imageClassName?: string;
  className?: string;
  textClassName?: string;
};

export enum CategoryEnum {
  Bicycles,
  Coolers,
  Stationery,
  Miscellaneous,
  Mattresses,
  Kitchenware,
  Instruments,
  Electronics,
}

export enum ConditionEnum {
  "Brand New",
  "Like New",
  "Used",
}

export interface IProduct {
  _id: Types.ObjectId;
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

export interface IChat {
  Seller: string;
  Buyer: string;
  ProductId: string;
  Messages: Array<ObjectId>;
  status: "invite" | "active" | "stale";
}

interface userDetails {
  First_Name: string;
  Last_Name: string;
  Phone_Number: string;
  id: string;
  Avatar: string;
}

interface IProductDetails {
  productId: string;
  Seller: string;
  Total_Quantity_Available: number;
  Product_Name: string;
  Images: string[];
}

export interface chatDetails {
  productDetails: IProductDetails;
  sellerDetails: userDetails;
  buyerDetails: userDetails;
}
export interface MessageTypes {
  msgId?: string;
  Sender: string;
  Message: string;
  options: boolean;
  FileUrl?: string;
  TimeStamp: string;
  accepted?: "accepted" | "rejected" | "pending";
  readStatus: boolean;
}
