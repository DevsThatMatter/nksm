"use server";
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
  imagesArray: string[];
  negotiate: boolean;
};
export async function addProductFromListing(values: formData) {
  try {
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
    console.log(product);
    return {
      success: true,
      message: "Product added successfully",
      id: product._id,
    };
  } catch (error) {
    return { success: false, message: "Server error has occured" };
  }
}
