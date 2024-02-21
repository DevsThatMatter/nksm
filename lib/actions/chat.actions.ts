"use server";

import * as z from 'zod'

import { Types, mongo } from "mongoose";

import { User } from "../models/user.model";
import { connectToDB } from "../database/mongoose";
import { Chat } from "../models/chats.model";
import { Product } from "../models/product.model";

import { MessageTypes, SellerBuyerChatType, chatDetails } from "@/types";



function groupDocs(data: chatDetails[]): Map<Types.ObjectId, chatDetails[]> {
  const groupDocsByProduct = new Map<Types.ObjectId, chatDetails[]>();

  for (const doc of data) {
    const id = doc.productDetails._id;

    if (!groupDocsByProduct.has(id)) {
      groupDocsByProduct.set(id, []);
    }
    groupDocsByProduct.get(id)?.push(doc);
  }

  return groupDocsByProduct;
}

export async function getAllChats(userId: string) {
  try {
    connectToDB();

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid userId provided");
    }
    
    const matchStage0 = {
      $match: {
        Seller: new mongo.ObjectId('65c5e97aafe71c6df760f715')
      },
    };

    const matchStage1 = {
      $match: {
        Buyer: new mongo.ObjectId('65c5e97aafe71c6df760f715')
      },
    };

    const addFieldsStage = {
      $addFields: {
        ProductOid: { $toObjectId: "$ProductId" },
        SellerId: { $toObjectId: "$Seller" },
        BuyerId: { $toObjectId: "$Buyer" },
      },
    };

    const lookupStage1 = {
      $lookup: {
        from: "products",
        localField: "ProductOid",
        foreignField: "_id",
        as: "ProductInfo",
      },
    };

    const lookupStage2 = {
      $lookup: {
        from: "users",
        localField: "SellerId",
        foreignField: "_id",
        as: "sellerInfo",
      },
    };

    const lookupStage3 = {
      $lookup: {
        from: "users",
        localField: "BuyerId",
        foreignField: "_id",
        as: "buyerInfo",
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        productDetails: { $first: "$ProductInfo" },
        sellerDetails: {
          $first: {
            $map: {
              input: "$sellerInfo",
              as: "seller",
              in: {
                First_Name: "$$seller.First_Name",
                Last_Name: "$$seller.Last_Name",
                Phone_Number: "$$seller.Phone_Number",
                id: { $toString: "$$seller._id" },
              },
            },
          },
        },
        buyerDetails: {
          $first: {
            $map: {
              input: "$buyerInfo",
              as: "buyer",
              in: {
                First_Name: "$$buyer.First_Name",
                Last_Name: "$$buyer.Last_Name",
                Phone_Number: "$$buyer.Phone_Number",
                id: { $toString: "$$buyer._id" },
              },
            },
          },
        },
      },
    };

    const userIsSellerPipeline = [
      matchStage0,
      addFieldsStage,
      lookupStage1,
      lookupStage2,
      lookupStage3,
      projectStage,
    ];

    const userIsBuyerPipeline = [
      matchStage1,
      addFieldsStage,
      lookupStage1,
      lookupStage2,
      lookupStage3,
      projectStage,
    ];

    const resultWhereUserIsSeller: chatDetails[] = await Chat.aggregate(userIsSellerPipeline).exec();
    const resultWhereUserIsBuyer: chatDetails[] = await Chat.aggregate(userIsBuyerPipeline).exec();
    let resultWhereUserIsSeller1 = groupDocs(resultWhereUserIsSeller)
    console.log("user is seller=>",resultWhereUserIsSeller)
   

    return {
      data: { resultWhereUserIsBuyer,resultWhereUserIsSeller1 },
      fetchComplete:true
    };
  } catch (error) {
    console.error("Error in chatHandler:", error);
    throw error;
  }
}


export async function chatBetweenSellerAndBuyerForProduct(
  otherUserPhoneNumber: string,
  buyerId: string,
  productId: string
) {
  try {
    if (!otherUserPhoneNumber || typeof otherUserPhoneNumber !== "string") {
      throw new Error("Invalid phonenumber provided");
    }
    if (!buyerId || typeof buyerId !== "string") {
      throw new Error("Invalid Buyer provided");
    }
    if (!productId || typeof productId !== "string") {
      throw new Error("Invalid userId provided");
    }
    const chats = (await Chat.findOne({
      Buyer: buyerId,
      Product: productId,
    })) as SellerBuyerChatType;
    if (!chats) {
      console.log("No recent chats");
      return [];
    }
    return chats;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
}


const GetmessageProps = z.object({
  sellerId: z.string().min(1, { message: "No less than one sellerId required" }),
  buyerId: z.string().min(1, { message: "BuyerId is required" }),
  productId: z.string().min(1, { message: "ProductId is required" }),
  currentUser: z.string().min(1, { message: "Current user is required" }),
  pageNo: z.number().optional(),
});

export async function getMessages(props: z.infer<typeof GetmessageProps>) {
  try {
    const validatedProps = GetmessageProps.parse(props);

    let messages = [];
    const docPerPage = 10;
    const pipeline = [
      {
        $match: {
          Seller: new mongo.ObjectId(validatedProps.sellerId),
          Buyer: new mongo.ObjectId(validatedProps.buyerId),
          ProductId: new mongo.ObjectId(validatedProps.productId)
        }
      },
      {
        $project: {
          _id: 0,
          Messages: 1
        }
      }
    ];
    const pagesToSkip = validatedProps.pageNo !== undefined ? validatedProps.pageNo * docPerPage : 0;
    messages = await Chat.aggregate(pipeline).limit(docPerPage).skip(pagesToSkip) as MessageTypes[];
    const nextPageNo = messages.length === docPerPage ? (validatedProps.pageNo || 0) + 1 : null;

    return {
      items: messages,
      nextPageNo: nextPageNo,
    }
  } catch (error) {
    console.error("MESSAGES_GET", error);
    return { message: "Some internal server error" }
  }
}

const CreateMessagesProps = z.object({
  message: z.string().min(1, { message: "No more than one message can be sent at a time" }), sender: z.string().min(1, { message: "sender must be provided" }),
  fileUrl: z.string().optional(),
  sellerId: z.string().min(1, { message: "seller id must be provided" }),
  buyerId: z.string().min(1, { message: "buyer id must be provided" }),
  productId: z.string().min(1, { message: "product id must be provided" }),
})

export async function createMessages(props: z.infer<typeof CreateMessagesProps>) {
  const validatedProps = CreateMessagesProps.parse(props)
  const senderId = new Types.ObjectId(validatedProps.sender)
  const checkUserExists = async (id: Types.ObjectId, name: string) => {
    const user = await User.findById(id);
    if (!user) {

    }
  };

  await checkUserExists(new Types.ObjectId(validatedProps.sellerId), 'sellerId');
  await checkUserExists(new Types.ObjectId(validatedProps.buyerId), 'buyerId');

  const product = await Product.findById(validatedProps.productId);
  if (!product) {

  }

  const newMessage = { Sender: validatedProps.sender, Message: validatedProps.message, Timestamp: "" };
  await Chat.findOneAndUpdate(
    // find
    {
      $or: [
        { sellerId: validatedProps.sellerId, buyerId: validatedProps.buyerId },
      ],
      ProductId: validatedProps.productId,
    },
    // update
    { $push: { Messages: newMessage } },
    // extra opt
    { $upsert: 1 }
  );
}
