
import { Types } from "mongoose";
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

export interface Product {
  _id: string;
  Seller: {
    SellerId: string,
    Username: string,
    Phone_Number: string,
    Avatar: string,
    Email :string,
  }
  Quantity: number;
  Product_Name: string;
  Description: string;
  Price: number;
  Images: string[];
  Condition: ConditionEnum;
  Category: CategoryEnum;
  Expiry: Date;
}
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
