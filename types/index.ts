import mongoose, { ObjectId, Types } from "mongoose";

export type category = {
  name: string;
  imgUrl: string;
  darkImgUrl: string;
  imageClassName?: string;
  className?: string;
  textClassName?: string;
};

export type SortBy = "newest" | "oldest" | "high" | "low";

export interface Seller {
  SellerId: string;
  Username: string;
  Avatar: string;
  Email: string;
  Name: string;
}

export interface User {
  Username: string;
  Email: string;
  Avatar: string;
  Name: string;
  id: mongoose.Types.ObjectId;
}
export interface CommentsInterface {
  _id?: mongoose.Types.ObjectId;
  Product: Product;
  User: User;
  Comment: string;
}
export type CommentsType = CommentsInterface[];

export interface Product {
  _id: mongoose.Types.ObjectId;
  Seller: Seller;
  Comments: CommentsType;
  Quantity: number;
  Product_Name: string;
  Description: string;
  Price: number;
  Images: string[];
  Negotiable: boolean;
  Condition: ConditionEnum;
  Category: CategoryEnum;
  Expiry: Date;
}

export enum CategoryEnum {
  "Bicycles" = "Bicycles",
  "Coolers" = "Coolers",
  "Stationery" = "Stationery",
  "Miscellaneous" = "Miscellaneous",
  "Mattresses" = "Mattresses",
  "Kitchenware" = "Kitchenware",
  "Instruments" = "Instruments",
  "Electronics" = "Electronics",
}

export enum ConditionEnum {
  "Brand New" = "Brand New",
  "Like New" = "Like New",
  "Used" = "Used",
}

export enum NegotiateEnum {
  "Yes" = "Yes",
  "No" = "No",
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
  status: "invite" | "active" | "stale" | "dead";
}

interface userDetails {
  Name: string;
  Username: string;
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
  TimeStamp: string;
  accepted?: "accepted" | "rejected" | "pending";
  readStatus: boolean;
}
