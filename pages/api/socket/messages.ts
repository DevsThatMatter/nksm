import { NextApiRequest } from "next";
import { z, ZodError } from "zod";
import { MessageTypes, NextApiResponseServerIo } from "@/types";
import { Chat } from "@/lib/models/chats.model";
import { Product } from "@/lib/models/product.model";
import { User } from "@/lib/models/user.model";
import { Types } from "mongoose";
import { Message } from "@/lib/models/message.model";

export const CreateMessagesBodyProps = z.object({
  message: z
    .string()
    .min(1, { message: "No more than one message can be sent at a time" }),
  sender: z.string().min(1, { message: "sender must be provided" }),
  fileUrl: z.string().optional(),
  dealDone: z.boolean(),
});

export const CreateMessagesQueryProps = z.object({
  sellerId: z.string().min(1, { message: "seller id must be provided" }),
  buyerId: z.string().min(1, { message: "buyer id must be provided" }),
  productId: z.string().min(1, { message: "product id must be provided" }),
});

const ObjectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
  });

export default async function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  console.log("hello from backend");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, sender, fileUrl, dealDone } =
      CreateMessagesBodyProps.parse(req.body);
    const { sellerId, buyerId, productId } = CreateMessagesQueryProps.parse(
      req.query
    );

    if (!message) {
      return res.status(400).json({ Error: "Message content not provided" });
    }

    const validateIdFormat = (id: string, name: string) => {
      try {
        ObjectIdSchema.parse(id);
      } catch (error) {
        throw new Error(
          `Invalid ${name} format, type of ${name}= ${typeof id}`
        );
      }
    };

    validateIdFormat(sellerId, "sellerId");
    validateIdFormat(buyerId, "buyerId");
    validateIdFormat(productId, "productId");

    const checkUserExists = async (id: string, name: string) => {
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ Error: `No ${name} with this id was found` });
      }
    };

    await checkUserExists(sellerId, "sellerId");
    await checkUserExists(buyerId, "buyerId");

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ Error: "No product with this id was found" });
    }
    const currentTimeStamp = new Date();
    let newMessage: MessageTypes;
    console.log(dealDone)
    if (dealDone) {
      newMessage = {
        Sender: sender,
        Message: "Lets have a deal?",
        options: true,
        TimeStamp: currentTimeStamp.toISOString(),
        accepted: "pending",
        readStatus:false
      };
    } else {
      newMessage = {
        Sender: sender,
        Message: message,
        options: false,
        TimeStamp: currentTimeStamp.toISOString(),
        readStatus:false
      };
    }

    const chat = await Chat.findOne({
      Seller: sellerId,
      Buyer: buyerId,
      ProductId: productId,
    });

    const createdMessage = await Message.create({
      ...newMessage,
    });

    if (chat) {
      console.log("chat found")
      chat.Messages.push(createdMessage._id); 
      await chat.save();
    } else {
      console.log("chat not found")
      const newChat = new Chat({
        Seller: sellerId,
        Buyer: buyerId,
        ProductId: productId,
        Messages: [createdMessage._id],
      });
      await newChat.save();
    }

    const addKey = `chat:${productId},productId:${productId},sellerId:${sellerId},buyerId:${buyerId},add`;
    res?.socket?.server?.io?.emit(addKey, newMessage);

    return res.status(200).json({ Success: "Message sent successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Messages_post_pages: ", error);
    return res.status(500).json("Internal server error");
  }
}
