"use server";

import * as z from "zod";
import { Types, mongo, now } from "mongoose";

import { User } from "../models/user.model";
import { connectToDB } from "../database/mongoose";
import { Chat } from "../models/chats.model";
import { Product } from "../models/product.model";

import { MessageTypes, IChat, chatDetails } from "@/types";
import { Message } from "../models/message.model";
import { pusherServer } from "../pusher";
import { InviteStruct } from "@/app/components/Chat/displays/invite-display";
import { client } from "../database/redis-config";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const mongoId = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid ObjectId format",
});

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
    console.log("userid => ", userId);
    const matchStage0 = {
      $match: {
        Seller: new mongo.ObjectId(userId),
        status: { $in: ["active", "stale"] },
      },
    };

    const matchStage1 = {
      $match: {
        Buyer: new mongo.ObjectId(userId),
        status: { $in: ["active", "stale"] },
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
    const sortStage = {
      $sort: {
        UpdatedAt: -1 as const,
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
                Name: "$$seller.Name",
                Username: "$$seller.Username",
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
                Name: "$$buyer.Name",
                Username: "$$buyer.Username",
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
      sortStage,
      projectStage,
    ];

    const userIsBuyerPipeline = [
      matchStage1,
      productLookup,
      buyerLookup,
      sellerLookup,
      sortStage,
      projectStage,
    ];

    const resultWhereUserIsSeller: chatDetails[] =
      await Chat.aggregate(userIsSellerPipeline).exec();
    const resultWhereUserIsBuyer: chatDetails[] =
      await Chat.aggregate(userIsBuyerPipeline).exec();

    let resultWhereUserIsSeller1 = groupDocs(resultWhereUserIsSeller);

    return {
      data: { resultWhereUserIsBuyer, resultWhereUserIsSeller1 },
    };
  } catch (error) {
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
      return [];
    }
    return chats;
  } catch (error) {
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
    if (validatedProps.caller === "yes") {
      await Chat.updateOne(
        {
          Seller: new mongo.ObjectId(validatedProps.seller),
          Buyer: new mongo.ObjectId(validatedProps.buyer),
          ProductId: new mongo.ObjectId(validatedProps.productId),
        },
        {
          $set: { status: "stale" },
        },
      );
      await Product.updateOne(
        {
          _id: new mongo.ObjectId(props.productId),
        },
        {
          is_archived: true,
        },
      );
      const messageIds = await Chat.aggregate([
        {
          $match: {
            Seller: new mongo.ObjectId(validatedProps.seller),
            Buyer: new mongo.ObjectId(validatedProps.buyer),
            ProductId: new mongo.ObjectId(validatedProps.productId),
          },
        },
        {
          $lookup: {
            from: "messages",
            localField: "Messages",
            foreignField: "_id",
            as: "chatMessages",
          },
        },
        {
          $unwind: "$chatMessages",
        },
        {
          $match: {
            "chatMessages.accepted": "pending",
          },
        },
        {
          $group: {
            _id: "$_id",
            chatMessages: {
              $push: "$chatMessages",
            },
          },
        },
        {
          $project: {
            _id: 0,
            "chatMessages._id": 1,
          },
        },
      ]);
      for (const msg of messageIds[0].chatMessages) {
        const updatedMessage = await Message.findOneAndUpdate(
          {
            _id: new mongo.ObjectId(msg._id),
          },
          {
            $set: { accepted: "accepted" },
          },
          { new: true },
        );
        const updateKey = `chat${validatedProps.productId}productId${validatedProps.productId}sellerId${validatedProps.seller}buyerId${validatedProps.buyer}update`;
        await pusherServer.trigger(
          updateKey,
          "messages:update",
          updatedMessage,
        );
      }

      await Chat.updateMany(
        {
          Seller: new mongo.ObjectId(validatedProps.seller),
          ProductId: new mongo.ObjectId(validatedProps.productId),
        },
        {
          $set: { status: "dead" },
        },
      );
      await Chat.updateMany(
        {
          Seller: new mongo.ObjectId(validatedProps.seller),
          ProductId: new mongo.ObjectId(validatedProps.productId),
          BuyerId: new mongo.ObjectId(validatedProps.buyer),
        },
        {
          $set: { status: "stale" },
        },
      );
      const product = await Product.findOne({
        _id: new mongo.ObjectId(validatedProps.productId),
      });
      product.Total_Quantity_Available--;
      if (product.Total_Quantity_Available <= 0) {
        product.is_archive = true;
      }
      await product.save();

      await User.updateOne(
        {
          _id: new mongo.ObjectId(validatedProps.buyer),
        },
        {
          $push: {
            Ordered_Products: new mongo.ObjectId(validatedProps.productId),
          },
        },
      );
    } else {
      const messageUpdateQuery = {
        _id: new mongo.ObjectId(validatedProps.msgId),
      };
      await Message.updateOne(messageUpdateQuery, {
        $set: {
          accepted: "rejected",
        },
      });

      const updatedMessage = await Message.findOne({
        _id: new mongo.ObjectId(validatedProps.msgId),
      });
      const updateKey = `chat${validatedProps.productId}productId${validatedProps.productId}sellerId${validatedProps.seller}buyerId${validatedProps.buyer}update`;
      await pusherServer.trigger(updateKey, "messages:update", updatedMessage);
    }

    return {
      content: "Deal locked successfully",
      status: 200,
    };
  } catch (error) {
    return {
      content: null,
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
) {
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

  const unreadCount = (result.length > 0 ? result[0].unreadCount : 0) as number;
  return unreadCount;
}
export async function countUnreadMessages(
  props: z.infer<typeof UnreadMessagesProps> & {
    caller: "get" | "update-read" | "update-write";
    messageId?: string;
  },
) {
  const userId = (await auth())?.user?.id;
  const otherUser = props.buyerId === userId ? props.sellerId : props.buyerId;
  try {
    const chatId = (
      await Chat.findOne({
        Seller: new mongo.ObjectId(props.sellerId),
        Buyer: new mongo.ObjectId(props.buyerId),
        ProductId: new mongo.ObjectId(props.productId),
      })
    )._id.toString();

    if (props.caller === "get") {
      const cacheKey = `chatId-${chatId}-userId-${userId}`;
      const cachedVal = await client.get(cacheKey);
      if (cachedVal) {
        return Number(cachedVal);
      }
      const count = (await computeUnreadMessages(props)).toString();

      await client.set(cacheKey, count, "EX", 1800);

      return Number(count);
    } else if (props.caller === "update-read") {
      await Message.updateOne(
        {
          _id: new mongo.ObjectId(props.messageId),
        },
        {
          readStatus: true,
        },
      );
      const cacheKey = `chatId-${chatId}-userId-${userId}`;
      let cachedVal = Number(await client.get(cacheKey));
      cachedVal--;

      if (cachedVal < 0) {
        cachedVal = 0;
      }

      await client.set(cacheKey, cachedVal, "EX", 1800);
      return cachedVal;
    } else {
      const otherUserCache = `chatId-${chatId}-userId-${otherUser}`;
      let cachedVal = Number(await client.get(otherUserCache));
      if (cachedVal) {
        cachedVal++;
        await client.set(otherUserCache, cachedVal, "EX", 1800);
        return cachedVal;
      }
      const count = (await computeUnreadMessages(props)).toString();

      await client.set(otherUserCache, count, "EX", 1800);
      const channelKey = `productId${props.productId}sellerId${props.sellerId}buyerId${props.buyerId}write-update-count`;

      console.log("channel key => ", channelKey);

      pusherServer.trigger(channelKey, "unreadCount:inc", Number(count));

      return Number(count);
    }
  } catch (error) {
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

    const createdMessage = await Message.create({
      Sender: sender,
      Message: dealDone ? "Lets have a deal?" : validatedProps.message,
      options: dealDone,
      TimeStamp: new Date().toISOString(),
      accepted: "pending",
      readStatus: false,
    });

    let newMessage: MessageTypes = {
      msgId: createdMessage._id.toString(),
      Sender: sender,
      Message: createdMessage.Message,
      options: dealDone ? true : false,
      TimeStamp: createdMessage.TimeStamp,
      accepted: "pending",
      readStatus: false,
    };

    const addKey = `chat${validatedProps.productId}productId${validatedProps.productId}sellerId${validatedProps.sellerId}buyerId${validatedProps.buyerId}add`;
    await pusherServer.trigger(addKey, "messages:new", newMessage);

    const chat = await Chat.findOne({
      Seller: validatedProps.sellerId,
      Buyer: validatedProps.buyerId,
      ProductId: validatedProps.productId,
    });

    const updatedChat = await Chat.findOneAndUpdate(
      {
        Seller: validatedProps.sellerId,
        Buyer: validatedProps.buyerId,
        ProductId: validatedProps.productId,
      },
      {
        $push: { Messages: createdMessage._id },
        $set: { UpdatedAt: now() },
      },
      { upsert: true, new: true },
    );

    await countUnreadMessages({
      productId,
      sellerId,
      buyerId,
      currentUser: sender,
      caller: "update-write",
    });
  } catch (error) {
    console.log("error ", error);
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

export interface getMessagesResult {
  msgId: string;
  Message: string;
  Sender: string;
  TimeStamp: string;
  options: boolean;
  readStatus: boolean;
}

export async function getMessages(props: z.infer<typeof GetmessageProps>) {
  try {
    const docPerPage = 15;
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
                msgId: { $toString: "$$msg._id" },
                Message: "$$msg.Message",
                Sender: "$$msg.Sender",
                accepted: "$$msg.accepted",
                TimeStamp: "$$msg.TimeStamp",
                options: "$$msg.options",
                readStatus: "$$msg.readStatus",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: props.pageNo,
          Messages: 1,
          Locked: 1,
        },
      },
      { $unwind: "$Messages" },
      { $sort: { "Messages.TimeStamp": -1 as const } },
      { $skip: (props.pageNo ?? 0) * docPerPage },
      { $limit: docPerPage },
      {
        $group: {
          _id: 1,
          Messages: { $push: "$Messages" },
        },
      },
    ];

    const [chat, messages] = await Promise.all([
      Chat.findOne({
        Seller: new mongo.ObjectId(props.sellerId),
        Buyer: new mongo.ObjectId(props.buyerId),
        ProductId: new mongo.ObjectId(props.productId),
      }),
      Chat.aggregate(pipeline),
    ]);
    const nextPageNo =
      messages && messages[0].Messages.length === docPerPage
        ? (props.pageNo ?? 0) + 1
        : undefined;
    return {
      content: {
        messages: messages ? (messages[0].Messages as getMessagesResult[]) : [],
        Locked: chat?.status === "stale",
        nextPageNo,
      },
      msg: "Success, the initial messages found",
      status: 200,
    };
  } catch (error) {
    return {
      content: {
        messages: [] as getMessagesResult[],
      },
      msg: "Internal server error",
      status: 500,
    };
  }
}

export async function fecthInvites(userId: string) {
  try {
    await connectToDB();
    const pipeline = [
      {
        $match: {
          Seller: new mongo.ObjectId(userId),
          status: "invite",
          ProductId: { $exists: true },
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
                Name: "$$buyer.Name",
                Username: "$$buyer.Username",
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
          InitPrice: 1,
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
          "sellerDetails.Name": 1,
          "sellerDetails.Username": 1,
          sellerId: {
            $toString: "$sellerDetails._id",
          },
          "productDetails.Product_Name": 1,
          "productDetails.Images": 1,
          productId: {
            $toString: "$productDetails._id",
          },
          InitPrice: 1,
        },
      },
    ];
    const data = (await Chat.aggregate(pipeline)) as InviteStruct[];
    data?.sort((a: InviteStruct, b: InviteStruct) => {
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
  } catch (error) {
    throw error;
  }
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
    await connectToDB();
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
      await Chat.findOneAndDelete({
        Seller: props.sellerId,
        Buyer: props.buyerId,
        ProductId: props.productId,
      });
    }
    revalidatePath("/chat");
  } catch (error) {
    throw error;
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

interface IAllUserSentInvites {
  Seller: {
    Avatar: string;
    Name: string;
  };
  Product: {
    Name: string;
  };
}

export async function getAllUserSentInvites(userId: string) {
  try {
    await connectToDB();
    const sentInvites: IAllUserSentInvites[] = await Chat.aggregate([
      {
        $match: {
          Buyer: new mongo.ObjectId(userId),
          status: "invite",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { sellerId: "$Seller" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$sellerId"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                "Seller.Avatar": "$Avatar",
                "Seller.Name": "$Name",
              },
            },
          ],
          as: "SellerInfo",
        },
      },
      {
        $lookup: {
          from: "products",
          let: { productId: "$ProductId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$productId"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                "Product.Name": "$Product_Name",
              },
            },
          ],
          as: "ProductInfo",
        },
      },
      {
        $unwind: "$SellerInfo",
      },
      {
        $unwind: "$ProductInfo",
      },
      {
        $project: {
          "Seller.Avatar": "$SellerInfo.Seller.Avatar",
          "Seller.Name": "$SellerInfo.Seller.Name",
          "Product.Name": "$ProductInfo.Product.Name",
          _id: 0,
        },
      },
    ]);
    return sentInvites;
  } catch (error) {
    throw error;
  }
}

export async function getLastMessages({
  productId,
  sellerId,
  buyerId,
}: {
  productId: string;
  sellerId: string;
  buyerId: string;
}) {
  try {
    await connectToDB();
    const pipeline = [
      {
        $match: {
          Seller: new mongo.ObjectId(sellerId),
          Buyer: new mongo.ObjectId(buyerId),
          ProductId: new mongo.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "Messages",
          foreignField: "_id",
          as: "foreignMessages",
        },
      },
      {
        $unwind: "$foreignMessages",
      },
      {
        $sort: {
          "foreignMessages.TimeStamp": -1 as const,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          lastSentForeignMessage: "$foreignMessages.Message",
          sentBy: "$foreignMessages.Sender",
          _id: 0,
        },
      },
    ];
    const lastMsg: {
      lastSentForeignMessage: string;
      sentBy: string;
    } = (await Chat.aggregate(pipeline))[0];
    console.log("last msg => ", lastMsg);
    return {
      lastMsg: lastMsg,
      productId: productId.toString(),
      status: 200,
    };
  } catch (error) {
    return {
      lastMsg: null,
      productId: productId.toString(),
      status: 500,
    };
  }
}

const deleteChatProps = z.object({
  Seller: mongoId,
  Buyer: mongoId,
  ProductId: mongoId,
});

export async function handelDeleteChat(props: z.infer<typeof deleteChatProps>) {
  try {
    const { success } = deleteChatProps.safeParse(props);
    if (!success) {
      throw new Error("Error  while parsing delete chat props");
    }
    await connectToDB();

    await Chat.findOneAndDelete({
      Seller: props.Seller,
      Buyer: props.Buyer,
      ProductId: props.ProductId,
    });
    revalidatePath("/chat");
  } catch (error) {
    console.log("ERORR_WHILE_DELETING_CHAT", error);
    throw error;
  }
}
