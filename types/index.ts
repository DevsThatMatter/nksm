import { IProduct } from "@/lib/interfaces";
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
  'Brand New',
  'Like New',
  'Used',
}


interface userDetails {
  First_Name: string;
  Last_Name: string;
  Phone_Number: string;
  id: string;
}
export interface chatDetails {
  productDetails: IProduct;
  sellerDetails: userDetails;
  buyerDetails: userDetails;
}
export interface MessageTypes {
  Sender: string;
  Message: string;
  Timestamp?: string;
}


export interface SellerBuyerChatType {
  Seller: string;
  Buyer: string;
  ProductId: string;
  Messages: Array<MessageTypes>;
}