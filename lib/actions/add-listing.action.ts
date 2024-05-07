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
  const id = await upsert(result.data);
  return redirect(`/product/${id}`, RedirectType.replace);
}

async function upsert(values: z.infer<typeof FormDataSchemaBack>) {
  try {
    await connectToDB();
    const userId = (await auth())?.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }

    const product: any = values.id
      ? await Product.findOneAndUpdate(
          { _id: values.id, Seller: userId },
          {
            Total_Quantity_Available: values.quantity,
            Product_Name: values.iname,
            Description: values.description,
            Price: values.price,
            Images: values.images,
            Condition: values.condition,
            Category: values.category,
            Negotiable: values.negotiate,
          },
          {
            upsert: true,
            new: true,
            select: "_id",
          },
        ).lean()
      : await Product.create({
          Seller: userId,
          Total_Quantity_Available: values.quantity,
          Product_Name: values.iname,
          Description: values.description,
          Price: values.price,
          Images: values.images,
          Condition: values.condition,
          Category: values.category,
          Negotiable: values.negotiate,
        });
    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { Owned_Products: product._id },
      },
      { select: "" },
    ).lean();
    return product._id.toString();
  } catch (error) {
    throw new Error();
  }
}
