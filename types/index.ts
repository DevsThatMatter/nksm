import mongoose, { mongo } from "mongoose";
import { Socket, Server as netServer } from "net";
import { NextApiResponse } from "next";
import { Server as socketIoServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: netServer & {
      io: socketIoServer;
    };
  };
};
export type category = {
  name: string;
  imgUrl: string;
  imageClassName?: string;
  className?: string;
  textClassName?: string;
};

export interface Seller {
  SellerId: string;
  Username: string;
  Phone_Number: string;
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
  Quantity: number;
  Product_Name: string;
  Description: string;
  Price: number;
  Images: string[];
  Condition: ConditionEnum;
  Category: CategoryEnum;
  Expiry: Date;
  Negotiable: NegotiateEnum;
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
