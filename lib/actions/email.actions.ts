"use server";

import { Chat } from "../models/chats.model";
import { User } from "../models/user.model";
import { mongo } from "mongoose";
import { connectToDB } from "../database/mongoose";
import nodemailer from "nodemailer";

async function getIdByEmail(email: string) {
  const id = (await User.findOne({ Email: email }))._id;
  return id;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_ACCOUNT,
    pass: process.env.SMTP_PASSKEY,
  },
});

export async function sendEmail(
  senderEmail: string,
  receiverEmail: string,
  productName: string,
  productImages: string[],
  productId: string,
  formData: {
    price: number;
  },
) {
  const { price } = formData;

  const htmlTemplate = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bid Offer</title>
    </head>
    <body
      style="margin: 0; font-family: Arial, sans-serif; background-color: #f8f8f8"
    >
      <main
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        "
      >
        <div
          style="
            width: 90%;
            max-width: 800px;
            padding: 20px;
            background-color: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h1 style="color: indigo; margin-bottom: 20px; text-align: center">
            Bid Offer
          </h1>
          <p style="margin-bottom: 30px; text-align: center">
            You've received a bid offer from ${senderEmail}.
          </p>
          <section
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 20px;
            "
          >
            <h2 style="margin-bottom: 10px">${productName}</h2>
            <img
              src={${productImages[0]}}
              alt="Product"
              style="max-width: 100%; height: auto; margin-bottom: 20px"
            />
            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div style="margin-bottom: 10px">
                <span style="font-weight: bold">Bid:</span>
                <span
                  style="
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    margin-left: 5px;
                  "
                  >${price}</span
                >
              </div>
              <button
                style="
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 24px;
                "
              >
                <a style="color: #fff" href="">Visit NKSM</a>
              </button>
            </div>
          </section>
        </div>
      </main>
    </body>
  </html>  
  `;
  try {
    await connectToDB();
    if (senderEmail === receiverEmail) {
      return {
        error: "Can't send invite to same user",
        msg: null,
        success: true,
      };
    }
    const existingInviteOrChat = await Chat.findOne({
      Seller: new mongo.ObjectId(await getIdByEmail(receiverEmail)),
      Buyer: new mongo.ObjectId(await getIdByEmail(senderEmail)),
      ProductId: new mongo.ObjectId(productId),
      status: { $ne: "dead" },
    }).countDocuments();
    if (existingInviteOrChat > 0) {
      return {
        error: "Yor all ready have sent an invite",
        msg: "",
        success: true,
      };
    }

    await transporter.sendMail({
      from: `"NKSM" <${senderEmail}>`,
      to: receiverEmail,
      html: htmlTemplate,
    });
    const sellerId = new mongo.ObjectId(await getIdByEmail(receiverEmail));
    const buyerId = new mongo.ObjectId(await getIdByEmail(senderEmail));

    const invite = await Chat.create({
      Seller: sellerId,
      Buyer: buyerId,
      ProductId: productId,
      status: "invite",
      Messages: [],
      InitPrice: price,
    });
    console.log("invite ", invite);

    const seller = await User.findOne({
      _id: sellerId,
    });
    seller.Chat_IDs.push(invite._id);

    const buyer = await User.findOne({
      _id: buyerId,
    });
    buyer.Chat_IDs.push(invite._id);

    return {
      error: null,
      msg: "An invite email has been sent.",
      success: true,
    };
  } catch (error) {
    return {
      msg: null,
      error: "Server issue. Please try again sometime later.",
      success: false,
    };
  }
}
