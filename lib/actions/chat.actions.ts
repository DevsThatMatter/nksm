"use server";

import ChatModel from "@/lib/models/chat.model";
import { connectToDB } from "@/lib/mongoose";
import mongoose, { ObjectId, mongo } from "mongoose";

type UserDetails = {
  first_name: string;
  last_name: string;
  phone_no: string;
  id: string;
};

type ProductDetails = {
  productName: string;
  id: string;
  currentUserStatus: string
};

export type ChatDetails = {
  SellerDetails: UserDetails;
  BuyerDetails: UserDetails;
  ProductDetails: ProductDetails;
};

export async function chatHandler(userId1: string, userId2: string) {
  try {
  } catch (error) {
    console.error("Error in chatHandler:", error);
  }
}

export async function getAllPrevChats(userId: string) {
  try {
    await connectToDB();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("User id was undefined or invalid");
      throw new Error("User id was undefined or invalid");
    }
    // I have made this pipeline in the compass and it can be tested or if wanted improveed by anyone
    const pipeline = [
      {
        $match: {
          $or: [
            { Seller: userId },
            { Buyer: userId },
          ],
        },
      },
      {
        $lookup: {
          from: "User",
          let: { sellerId: { $toObjectId: "$Seller" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$sellerId"] },
              },
            },
            {
              $project: {
                SellerDetails: {
                  first_name: "$First_Name",
                  last_name: "$Last_Name",
                  phone_no: "$Phone_Number",
                  id: "$_id",
                },
              },
            },
          ],
          as: "sellerDetails",
        },
      },
      {
        $lookup: {
          from: "User",
          let: { buyerId: { $toObjectId: "$Buyer" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$buyerId"] },
              },
            },
            {
              $project: {
                BuyerDetails: {
                  first_name: "$First_Name",
                  last_name: "$Last_Name",
                  phone_no: "$Phone_Number",
                  id: "$_id",
                },
              },
            },
          ],
          as: "buyerDetails",
        },
      },
      {
        $lookup: {
          from: "Product",
          let: { productOid: { $toObjectId: "$ProductId" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$productOid"] },
              },
            },
            {
              $project: {
                ProductDetails: {
                  id: { $toString: "$_id" },
                  productName: "$Product_Name",
                },
              },
            },
          ],
          as: "productDetails",
        },
      },
      {
        $project: {
          _id: 0,
          SellerDetails: { $arrayElemAt: ["$sellerDetails.SellerDetails", 0] },
          BuyerDetails: { $arrayElemAt: ["$buyerDetails.BuyerDetails", 0] },
          ProductDetails: { $arrayElemAt: ["$productDetails.ProductDetails", 0] },
        },
      },
    ];

    const output = await ChatModel.aggregate(pipeline);

    return output.map((doc: any) => ({
      SellerDetails: { ...doc.SellerDetails, id: doc.SellerDetails.id.toString() },
      BuyerDetails: { ...doc.BuyerDetails, id: doc.BuyerDetails.id.toString() },
      ProductDetails: {
        ...doc.ProductDetails,
        id: doc.ProductDetails.id.toString(),
        currentUserStatus: doc.SellerDetails.id === userId ? 'Seller' : 'Buyer',
      },
    }));
  } catch (error) {
    console.log("There is an Internal server Error: ", error);
    throw error;
  }
}

export async function getSingleChatDetails() {
  
}