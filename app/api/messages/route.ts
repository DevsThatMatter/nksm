import { Chat } from "@/lib/models/chats.model";
import { MessageTypes } from "@/types";
import { mongo } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const GetmessageProps = z.object({
  sellerId: z
    .string()
    .min(1, { message: "No less than one sellerId required" }),
  buyerId: z.string().min(1, { message: "BuyerId is required" }),
  productId: z.string().min(1, { message: "ProductId is required" }),
  currentUser: z.string().min(1, { message: "Current user is required" }),
  pageNo: z.number().optional(),
});

export async function GET(req: NextRequest) {
  try {
const params = Object.fromEntries(req.nextUrl.searchParams.entries());
const validatedProps = GetmessageProps.parse(params);


    const docPerPage = 10;
    const pipeline = [
      {
        $match: {
          Seller: new mongo.ObjectId(validatedProps.sellerId),
          Buyer: new mongo.ObjectId(validatedProps.buyerId),
          ProductId: new mongo.ObjectId(validatedProps.productId),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "Messages",
          foreignField: "_id",
          as: "Messages",
        },
      },
      {
        $addFields: {
          Messages: {
            $map: {
              input: "$Messages",
              as: "msg",
              in: {
                msgId: {
                  $toString: "$$msg._id",
                },
                Message: "$$msg.Message",
                Sender: "$$msg.Sender",
                accepted: "$$msg.accepted",
                TimeStamp: "$$msg.TimeStamp",
                options: "$$msg.options",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          Messages: 1,
          Locked: 1,
        },
      },
    ];

    const pagesToSkip =
      validatedProps.pageNo !== undefined
        ? validatedProps.pageNo * docPerPage
        : 0;
    const { Messages, Locked } = (
      await Chat.aggregate(pipeline).limit(docPerPage).skip(pagesToSkip)
    )[0] as { Messages: MessageTypes[]; Locked: boolean };
    Messages.sort((a, b) => {
      const dateA = new Date(a.TimeStamp);
      const dateB = new Date(b.TimeStamp);
      return dateA.getTime() - dateB.getTime();
    });

    const nextPageNo =
      Messages.length === docPerPage ? (validatedProps.pageNo ?? 0) + 1 : null;
    // {
    //   items: { messages: Messages, Locked },
    //   nextPageNo: nextPageNo,
    // }
    return NextResponse.json({
      items: {
        messages: Messages,
        Locked,
      },
      nextPageNo: nextPageNo,
    });
  } catch (error) {
    console.error("MESSAGES_GET", error);
    throw new Error("Some internal server error");
  }
}
