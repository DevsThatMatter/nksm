import { IProduct } from "@/lib/models/product.model";
import { IUser } from "@/lib/models/user.model";
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

export interface CommentsInterface {
  _id?: mongoose.Types.ObjectId;
  Product: IProduct;
  User: Pick<IUser, "Avatar" | "Name">;
  Comment: string;
}
export type CommentsType = CommentsInterface[];

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
export enum ChatStatusEnum {
  "invite",
  "active",
  "stale",
  "dead",
}

export enum MessageStatusEnum {
  "accepted",
  "rejected",
  "pending",
}
