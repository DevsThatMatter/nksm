"use server";
import { RedirectType, redirect } from "next/navigation";
import { connectToDB } from "../database/mongoose";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { auth } from "@/auth";
import { FormDataSchemaBack } from "../validations/listing-schema";
import { z } from "zod";

export async function addProductFromListing(
  values: z.infer<typeof FormDataSchemaBack>,
) {
  const result = FormDataSchemaBack.safeParse(values);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  const id = await update(result.data);
  redirect("/product/" + id, RedirectType.replace);
}

async function update(values: z.infer<typeof FormDataSchemaBack>) {
  try {
    await connectToDB();
    const userObj = await auth();
    if (!userObj?.user) {
      throw new Error("User not found");
    }

    const product = await Product.create({
      Seller: userObj.user.id,
      Total_Quantity_Available: values.quantity,
      Product_Name: values.iname,
      Description: values.description,
      Price: values.price,
      Images: values.images,
      Condition: values.condition,
      Category: values.category,
      Negotiable: values.negotiate,
    });

    await User.findByIdAndUpdate(userObj.user.id, {
      $push: { Owned_Products: product._id },
    });
    return product._id.toString();
  } catch (error) {
    throw new Error();
  }
}
