"use server";
import { permanentRedirect } from "next/navigation";
import { connectToDB } from "../database/mongoose";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";

type formData = {
  userId: string | undefined;
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
  console.log(id);
  permanentRedirect(`/product/${id}`);
}

async function update(values: formData) {
  try {
    console.log("hi");
    await connectToDB();
    const user = await User.findById(values.userId);
    const product = await Product.create({
      Seller: user._id,
      Total_Quantity_Available: values.quantity,
      Product_Name: values.iname,
      Description: values.description,
      Price: values.price,
      Images: [
        "https://img.freepik.com/free-vector/beauty-skin-care-background_52683-728.jpg?t=st=1709385459~exp=1709389059~hmac=183b3e043104f8b588aad1a901df1079015dc73367f17d9cdda3f55d19401e11&w=996",
      ],
      Condition: values.condition,
      Category: values.category,
      Negotiable: values.negotiate,
    });

    await User.findByIdAndUpdate(values.userId, {
      $push: { Owned_Products: product._id },
    });
    return product._id.toString();
    console.log(product);
  } catch (error) {
    throw new Error();
  }
}
