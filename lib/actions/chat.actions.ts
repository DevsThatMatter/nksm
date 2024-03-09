"use server";

import * as z from "zod";
import { Types, mongo } from "mongoose";

import { User } from "../models/user.model";
import { connectToDB } from "../database/mongoose";
import { Chat } from "../models/chats.model";
import { Product } from "../models/product.model";

import { MessageTypes, IChat, chatDetails } from "@/types";
import { Message } from "../models/message.model";
import { client } from "../database/redis-config";
import { pusherServer } from "../pusher";
import { InviteStruct } from "@/app/components/Chat/buyer-invites";

const mongoId = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid ObjectId format",
});

const GetUserIdSchema = z.object({
  email: z.string().email(),
});

export async function getUserId({ email }: z.infer<typeof GetUserIdSchema>) {
  try {
    await connectToDB();
    const user = await User.findOne({ Email: email });
    const userId = user._id.toString();
    return userId;
  } catch (error) {
    console.log("there was an error while fething user id");
    return undefined;
  }
}

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

export async function getAllChats(userId: z.infer<typeof mongoId>) {
  try {
    connectToDB();

    const matchStage0 = {
      $match: {
        Seller: new mongo.ObjectId(userId),
        status: { $eq: "active" },
      },
    };

    const matchStage1 = {
      $match: {
        Buyer: new mongo.ObjectId(userId),
        status: { $eq: "active" },
      },
    };

    const productLookup = {
      $lookup: {
        from: "products",
        localField: "ProductId",
        foreignField: "_id",
        as: "ProductInfo",
      },
    };

    const sellerLookup = {
      $lookup: {
        from: "users",
        localField: "Seller",
        foreignField: "_id",
        as: "sellerInfo",
      },
    };

    const buyerLookup = {
      $lookup: {
        from: "users",
        localField: "Buyer",
        foreignField: "_id",
        as: "buyerInfo",
      },
    };

    const projectStage = {
      $project: {
        productDetails: {
          $let: {
            vars: {
              product: {
                $arrayElemAt: ["$ProductInfo", 0],
              },
            },
            in: {
              productId: {
                $toString: "$$product._id",
              },
              Seller: {
                $toString: "$$product.Seller",
              },
              Total_Quantity_Available: "$$product.Total_Quantity_Available",
              Product_Name: "$$product.Product_Name",
              Images: "$$product.Images",
            },
          },
        },
        sellerDetails: {
          $first: {
            $map: {
              input: "$sellerInfo",
              as: "seller",
              in: {
                First_Name: "$$seller.First_Name",
                Last_Name: "$$seller.Last_Name",
                Phone_Number: "$$seller.Phone_Number",
                id: {
                  $toString: "$$seller._id",
                },
                Avatar: "$$seller.Avatar",
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
                id: {
                  $toString: "$$buyer._id",
                },
                Avatar: "$$buyer.Avatar",
              },
            },
          },
        },
        _id: 0,
      },
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
  productId: string,
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
    })) as IChat;
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
  props: z.infer<typeof CreateMessagesProps>,
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
    "sellerId",
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
    {
      $or: [
        { sellerId: validatedProps.sellerId, buyerId: validatedProps.buyerId },
      ],
      ProductId: validatedProps.productId,
    },
    { $push: { Messages: newMessage } },
    { $upsert: 1 },
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
    await connectToDB();
    const validatedProps = LockDealProps.parse(props);

    await Chat.updateOne(
      {
        Seller: new mongo.ObjectId(validatedProps.seller),
        Buyer: new mongo.ObjectId(validatedProps.buyer),
        ProductId: new mongo.ObjectId(validatedProps.productId),
      },
      {
        status: "stale",
      },
    );

    await Chat.updateMany(
      {
        ProductId: new mongo.ObjectId(props.productId),
      },
      {
        status: "stale",
      },
    );

    const messageUpdateQuery = {
      _id: new mongo.ObjectId(validatedProps.msgId),
    };

    const res = await Message.updateOne(messageUpdateQuery, {
      $set: {
        accepted: validatedProps.caller === "yes" ? "accepted" : "rejected",
      },
    });
    const updatedMessage = await Message.findOne({
      _id: new mongo.ObjectId(validatedProps.msgId),
    });
    const updateKey = `chat${validatedProps.productId}productId${validatedProps.productId}sellerId${validatedProps.seller}buyerId${validatedProps.buyer}update`;
    await pusherServer.trigger(updateKey, "messages:update", updatedMessage);

    return {
      content: res,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error("Error locking deal:", error);
    return {
      content: null,
      error: error,
      status: 500,
    };
  }
}

const UnreadMessagesProps = z.object({
  productId: mongoId,
  sellerId: mongoId,
  buyerId: mongoId,
  currentUser: mongoId,
});

async function computeUnreadMessages(
  props: z.infer<typeof UnreadMessagesProps>,
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
                  { $ne: ["$$msg.Sender", validatedProps.currentUser] },
                ],
              },
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
  },
): Promise<number> {
  const cacheKey = `unreadCount:${props.sellerId}-${props.buyerId}-${props.productId}`;
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

const CreateNewMessage = z.object({
  message: z
    .string()
    .min(1, { message: "No more than one message can be sent at a time" }),
  sender: mongoId,
  dealDone: z.boolean(),
  sellerId: mongoId,
  buyerId: mongoId,
  productId: mongoId,
});

export async function createNewMessage(
  message: string,
  sender: string,
  dealDone: boolean,
  sellerId: string,
  buyerId: string,
  productId: string,
) {
  try {
    const validatedProps = CreateNewMessage.parse({
      message,
      sender,
      dealDone,
      sellerId,
      buyerId,
      productId,
    });

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`No product with this id ${productId}`);
    }

    const currentTimeStamp = new Date();
    let newMessage: MessageTypes;

    if (dealDone) {
      newMessage = {
        Sender: validatedProps.sender,
        Message: "Lets have a deal?",
        options: true,
        TimeStamp: currentTimeStamp.toISOString(),
        accepted: "pending",
        readStatus: false,
      };
    } else {
      newMessage = {
        Sender: validatedProps.sender,
        Message: validatedProps.message,
        options: false,
        TimeStamp: currentTimeStamp.toISOString(),
        readStatus: false,
      };
    }

    const chat = await Chat.findOne({
      Seller: validatedProps.sellerId,
      Buyer: validatedProps.buyerId,
      ProductId: validatedProps.productId,
    });

    const createdMessage = await Message.create({
      ...newMessage,
    });

    if (chat) {
      console.log("chat found");
      chat.Messages.push(createdMessage._id);
      await chat.save();
    } else {
      console.log("chat not found");
      const newChat = new Chat({
        Seller: validatedProps.sellerId,
        Buyer: validatedProps.buyerId,
        ProductId: validatedProps.productId,
        Messages: [createdMessage._id],
      });
      await newChat.save();
    }

    const addKey = `chat${validatedProps.productId}productId${validatedProps.productId}sellerId${validatedProps.sellerId}buyerId${validatedProps.buyerId}add`;
    await pusherServer.trigger(addKey, "messages:new", newMessage);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`zod type error  ${error.message}`);
    }
  }
}

const GetmessageProps = z.object({
  sellerId: mongoId,
  buyerId: mongoId,
  productId: mongoId,
  currentUser: mongoId,
  pageNo: z.number().optional(),
});

export async function getInitialMessages(
  props: z.infer<typeof GetmessageProps>,
) {
  try {
    const docPerPage = 10;
    const pipeline = [
      {
        $match: {
          Seller: new mongo.ObjectId(props.sellerId),
          Buyer: new mongo.ObjectId(props.buyerId),
          ProductId: new mongo.ObjectId(props.productId),
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

    const skipCount =
      props.pageNo !== undefined ? props.pageNo * docPerPage : 0;
    const { Messages, Locked } = (
      await Chat.aggregate(pipeline).limit(docPerPage).skip(skipCount)
    )[0] as { Messages: MessageTypes[]; Locked: boolean };

    Messages.sort((a, b) => {
      const dateA = new Date(a.TimeStamp);
      const dateB = new Date(b.TimeStamp);
      return dateA.getTime() - dateB.getTime();
    });
    const nextPageNo =
      Messages.length === docPerPage ? (props.pageNo ?? 0) + 1 : undefined;

    return {
      content: {
        messages: Messages,
        Locked,
        nextPageNo,
      },
      msg: "Success, the initial messages found",
      status: 200,
      err: null,
    };
  } catch (error) {
    console.log("Error in get initial messages", error);
    return {
      content: null,
      msg: "Internal server error",
      status: 500,
      err: error,
    };
  }
}

export async function fecthInvites(userId: string) {
  const pipeline = [
    {
      $match: {
        Seller: new mongo.ObjectId(userId),
        status: "invite",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "Buyer",
        foreignField: "_id",
        as: "buyerDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "Seller",
        foreignField: "_id",
        as: "sellerDetails",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "ProductId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $project: {
        buyerDetails: {
          $map: {
            input: "$buyerDetails",
            as: "buyer",
            in: {
              Last_Name: "$$buyer.Last_Name",
              First_Name: "$$buyer.First_Name",
              Phone_Number: "$$buyer.Phone_Number",
              Avatar: "$$buyer.Avatar",
              address: "$$buyer.address",
              buyerId: {
                $toString: "$$buyer._id",
              },
            },
          },
        },
        sellerDetails: {
          $arrayElemAt: ["$sellerDetails", 0],
        },
        productDetails: {
          $arrayElemAt: ["$productDetails", 0],
        },
      },
    },
    {
      $unset: "_id",
    },
    {
      $project: {
        buyerDetails: 1,
        "sellerDetails.Avatar": 1,
        "sellerDetails.address": 1,
        "sellerDetails.Last_Name": 1,
        "sellerDetails.First_Name": 1,
        "sellerDetails.Phone_Number": 1,
        sellerId: {
          $toString: "$sellerDetails._id",
        },
        "productDetails.Product_Name": 1,
        "productDetails.Images": 1,
        productId: {
          $toString: "$productDetails._id",
        },
      },
    },
  ];
  const data = (await Chat.aggregate(pipeline)) as InviteStruct[];
  data.sort((a: InviteStruct, b: InviteStruct) => {
    const productNameA = a.productDetails.Product_Name.toLowerCase();
    const productNameB = b.productDetails.Product_Name.toLowerCase();

    if (productNameA < productNameB) {
      return -1;
    }
    if (productNameA > productNameB) {
      return 1;
    }
    return 0;
  });

  return data;
}

const AcceptInviteSchema = z.object({
  sellerId: mongoId,
  buyerId: mongoId,
  productId: mongoId,
  caller: z.enum(["accept", "reject"]),
});

export async function acceptTheInvite(
  props: z.infer<typeof AcceptInviteSchema>,
) {
  try {
    connectToDB();
    if (props.caller === "accept") {
      await Chat.updateOne(
        {
          Seller: props.sellerId,
          Buyer: props.buyerId,
          ProductId: props.productId,
        },
        {
          status: "active",
        },
      );
    } else {
      await Chat.updateOne(
        {
          Seller: props.sellerId,
          Buyer: props.buyerId,
          ProductId: props.productId,
        },
        {
          status: "reject",
        },
      );
    }
  } catch (error) {
    console.log("internal server error", error);
  }
}

const ChatStatusProps = z.object({
  sellerId: mongoId,
  buyerId: mongoId,
  productId: mongoId,
});

export async function getChatStatus(props: z.infer<typeof ChatStatusProps>) {
  try {
    const status = (
      await Chat.findOne({
        Seller: props.sellerId,
        Buyer: props.buyerId,
        ProductId: props.productId,
      })
    ).status;
    return {
      error: null,
      message: "status fetched successfuly",
      status: status,
    };
  } catch (error) {
    return {
      error: error,
      message: "some internal server error",
      status: null,
    };
  }
}
