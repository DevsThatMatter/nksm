"use server";

import * as z from "zod";
import { Types, mongo } from "mongoose";
import { Redis } from "ioredis";

import { User } from "../models/user.model";
import { connectToDB } from "../database/mongoose";
import { Chat } from "../models/chats.model";
import { Product } from "../models/product.model";

import { SellerBuyerChatType, chatDetails } from "@/types";
import { Message } from "../models/message.model";
import { client } from "../database/redis-config";


function groupDocs(data: chatDetails[]): Map<string, chatDetails[]> {
  const groupDocsByProduct = new Map<string, chatDetails[]>();

  for (const doc of data) {
    const id = doc.productDetails.productId;

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
        Seller: new mongo.ObjectId(userId),
      },
    };

    const matchStage1 = {
      $match: {
        Buyer: new mongo.ObjectId(userId),
      },
    };

    const productLookup = {
      '$lookup': {
        'from': 'products',
        'localField': 'ProductId',
        'foreignField': '_id',
        'as': 'ProductInfo'
      }
    };

    const sellerLookup = {
      '$lookup': {
        'from': 'users',
        'localField': 'Seller',
        'foreignField': '_id',
        'as': 'sellerInfo'
      }
    };

    const buyerLookup = {
      '$lookup': {
        'from': 'users',
        'localField': 'Buyer',
        'foreignField': '_id',
        'as': 'buyerInfo'
      }
    };

    const projectStage = {
      '$project': {
        'productDetails': {
          '$let': {
            'vars': {
              'product': {
                '$arrayElemAt': [
                  '$ProductInfo', 0
                ]
              }
            },
            'in': {
              'productId': {
                '$toString': '$$product._id'
              },
              'Seller': {
                '$toString': '$$product.Seller'
              },
              'Total_Quantity_Available': '$$product.Total_Quantity_Available',
              'Product_Name': '$$product.Product_Name',
              'Images': '$$product.Images'
            }
          }
        },
        'sellerDetails': {
          '$first': {
            '$map': {
              'input': '$sellerInfo',
              'as': 'seller',
              'in': {
                'First_Name': '$$seller.First_Name',
                'Last_Name': '$$seller.Last_Name',
                'Phone_Number': '$$seller.Phone_Number',
                'id': {
                  '$toString': '$$seller._id'
                },
                'Avatar': '$$seller.Avatar'
              }
            }
          }
        },
        'buyerDetails': {
          '$first': {
            '$map': {
              'input': '$buyerInfo',
              'as': 'buyer',
              'in': {
                'First_Name': '$$buyer.First_Name',
                'Last_Name': '$$buyer.Last_Name',
                'Phone_Number': '$$buyer.Phone_Number',
                'id': {
                  '$toString': '$$buyer._id'
                },
                'Avatar': '$$buyer.Avatar'
              }
            }
          }
        },
        '_id': 0
      }
    };

    const userIsSellerPipeline = [
      matchStage0,
      productLookup,
      buyerLookup,
      sellerLookup,
      projectStage,
    ];

    const userIsBuyerPipeline = [
      matchStage1,
      productLookup,
      buyerLookup,
      sellerLookup,
      projectStage,
    ];

    const resultWhereUserIsSeller: chatDetails[] =
      await Chat.aggregate(userIsSellerPipeline).exec();
    const resultWhereUserIsBuyer: chatDetails[] =
      await Chat.aggregate(userIsBuyerPipeline).exec();

    let resultWhereUserIsSeller1 = groupDocs(resultWhereUserIsSeller);

    return {
      data: { resultWhereUserIsBuyer, resultWhereUserIsSeller1 },
      fetchComplete: true,
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

const mongoId = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid ObjectId format",
});

const CreateMessagesProps = z.object({
  message: z
    .string()
    .min(1, { message: "No more than one message can be sent at a time" }),
  sender: mongoId,
  fileUrl: z.string().optional(),
  sellerId: mongoId,
  buyerId: mongoId,
  productId: mongoId,
});

export async function createMessages(
  props: z.infer<typeof CreateMessagesProps>
) {
  const validatedProps = CreateMessagesProps.parse(props);
  const senderId = new Types.ObjectId(validatedProps.sender);
  const checkUserExists = async (id: Types.ObjectId, name: string) => {
    const user = await User.findById(id);
    if (!user) {
    }
  };

  await checkUserExists(
    new Types.ObjectId(validatedProps.sellerId),
    "sellerId"
  );
  await checkUserExists(new Types.ObjectId(validatedProps.buyerId), "buyerId");

  const product = await Product.findById(validatedProps.productId);
  if (!product) {
  }

  const newMessage = {
    Sender: validatedProps.sender,
    Message: validatedProps.message,
    Timestamp: "",
  };
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

const LockDealProps = z.object({
  productId: mongoId,
  seller: mongoId,
  buyer: mongoId,
  caller: z.enum(["yes", "no"]),
  msgId: mongoId,
});

export async function lockDeal(props: z.infer<typeof LockDealProps>) {
  try {
    await connectToDB(); // Assuming connectToDB is defined elsewhere

    const validatedProps = LockDealProps.parse(props);
    console.log("Validated Props:", validatedProps);

    let chat = await Chat.findOne(
      {
        Seller: new mongo.ObjectId('65c5e97aafe71c6df760f715'),
        Buyer: new mongo.ObjectId('65c5e97aafe71c6df760f717'),
        ProductId: new mongo.ObjectId('65c5e97aafe71c6df760f722')
      },
    );

    if (!chat) {
      throw new Error('No matching document found');
    }

    chat.Locked = true;
    await chat.save();

    console.log("Updated Chat:", chat);

    const messageUpdateQuery = {
      _id: new mongo.ObjectId(validatedProps.msgId),
    };

    const messageUpdate = await Message.updateOne(
      messageUpdateQuery,
      { $set: { accepted: validatedProps.caller === "yes" ? "accepted" : "rejected" } }
    );

    console.log("Message Update:", messageUpdate);

  } catch (error) {
    console.error("Error locking deal:", error);
    throw error;
  }
}


const UnreadMessagesProps = z.object({
  productId: mongoId,
  sellerId: mongoId,
  buyerId: mongoId,
  currentUser: mongoId
});

async function computeUnreadMessages(
  props: z.infer<typeof UnreadMessagesProps>
): Promise<number> {
  connectToDB();
  const validatedProps = UnreadMessagesProps.parse(props);

  const result = await Chat.aggregate([
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
      $project: {
        unreadCount: {
          $size: {
            $filter: {
              input: "$Messages",
              as: "msg",
              cond: {
                $and: [
                  { $eq: ["$$msg.readStatus", false] },
                  { $ne: ["$$msg.Sender", validatedProps.currentUser] }
                ]
              }
            },
          },
        },
        _id: 0,
      },
    },
  ]);

  const unreadCount = result.length > 0 ? result[0].unreadCount : 0;

  return unreadCount;
}



export async function countUnreadMessages(
  props: z.infer<typeof UnreadMessagesProps> & {
    caller: "get" | "update";
    messageId?: string;
  }
): Promise<number> {
  const cacheKey = `unreadCount:${props.sellerId}-${props.buyerId}-${props.productId}`;
  console.log("caller by =>", props.caller);
  try {
    let cachedValue = await new Promise<number>((resolve, reject) => {
      client?.get(cacheKey, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply ? parseInt(reply, 10) : -1);
      });
    });

    if (props.caller === "get") {
      if (cachedValue !== -1) {
        return cachedValue;
      } else {
        const unreadCount = await computeUnreadMessages(props);
        client?.setex(cacheKey, 1800, unreadCount.toString());
        return unreadCount;
      }
    } else {
      if (cachedValue !== -1) {
        cachedValue -= 1;
        client?.setex(cacheKey, 1800, cachedValue);
        return cachedValue;
      } else {
        const unreadCount = await computeUnreadMessages(props);
        client?.setex(cacheKey, 1800, unreadCount.toString());
        await Message.updateOne({ _id: props.messageId }, { readStatus: true });
        return unreadCount;
      }
    }
  } catch (error) {
    console.error("Error counting unread messages:", error);
    throw error;
  }
}
