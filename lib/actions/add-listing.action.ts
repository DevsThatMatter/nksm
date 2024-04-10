"use server";
import { RedirectType, redirect } from "next/navigation";
import { connectToDB } from "../database/mongoose";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { auth } from "@/auth";

type formData = {
  iname: string;
  condition: string;
  description: string;
  category: string;
  price: number | "";
  quantity: number | "";
  images: string[];
  negotiate: boolean;
}; // to be updated to use zod schema when toggle is added
export async function addProductFromListing(values: formData) {
  const id = await update(values);
  redirect("/product/" + id, RedirectType.replace);
}

async function update(values: formData) {
  try {
    console.log("hi");
    await connectToDB();
    const userObj = await auth();

    const product = await Product.create({
      Seller: userObj?.user?.id,
      Total_Quantity_Available: values.quantity,
      Product_Name: values.iname,
      Description: values.description,
      Price: values.price,
      Images: values.images,
      Condition: values.condition,
      Category: values.category,
      Negotiable: values.negotiate,
    });

    await User.findByIdAndUpdate(userObj?.user?.id, {
      $push: { Owned_Products: product._id },
    });
    return product._id.toString();
    console.log(product);
  } catch (error) {
    throw new Error();
  }
}
