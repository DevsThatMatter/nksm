"use server";
import EmailTemplate from "@/app/components/ProductPage/email-template";
import { Resend } from "resend";
import { Chat } from "../models/chats.model";
import { string } from "zod";
import { User } from "../models/user.model";
import mongoose, { mongo } from "mongoose";
import { connectToDB } from "../database/mongoose";

interface State {
  error: string | null;
  success: boolean;
}

async function getIdByEmail(email: string) {
  const id = (await User.findOne({ Email: email }))._id;
  return id;
}

export async function sendEmail(
  senderEmail: string,
  receiverEmail: string,
  productName: string,
  productImages: string[],
  productId: string,
  formData: FormData,
) {
  let priceString = formData.get("price")?.toString();
  if (priceString === undefined) {
    priceString = "0";
  }
  let price = parseFloat(priceString);

  try {
    await connectToDB();
    const existingInviteOrChat = await Chat.findOne({
      Seller: new mongo.ObjectId(await getIdByEmail(receiverEmail)),
      Buyer: new mongo.ObjectId(await getIdByEmail(senderEmail)),
      ProductId: new mongo.ObjectId(productId),
      status: { $ne: "dead" },
    }).countDocuments();
    if (existingInviteOrChat > 0) {
      return {
        error: null,
        success: true,
      };
    }
    await Chat.create({
      Seller: new mongo.ObjectId(await getIdByEmail(receiverEmail)),
      Buyer: new mongo.ObjectId(await getIdByEmail(senderEmail)),
      ProductId: productId,
      status: "invite",
      Messages: [],
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "rajankamboj853@gmail.com",
      subject: "Bid offer",
      react: EmailTemplate({ senderEmail, price, productName, productImages }),
    });
    console.log("response => ", response);
    if (response.error) {
      console.log(response.error);
    }
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error sending the email. Please try again later.",
      success: false,
    };
  }
}
