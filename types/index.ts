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
