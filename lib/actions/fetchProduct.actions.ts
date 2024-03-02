"use server";

import { Product } from "../models/product.model";
import { connectToDB } from "../database/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";
export const fetchRecentProducts = async () => {
  try {
    await connectToDB();
    const fetchedProducts = await Product.find({})
      .limit(10)
      .select({ _id: 1, Images: 1, Product_Name: 1, Price: 1, Description: 1 })
      .sort({ createdAt: -1 });

    return fetchedProducts;
  } catch (error) {
    console.error("Error fetching recent products:", error);
  }
};

export const fetchRecentProductS = async () => {
  try {
    await connectToDB();
    const fetchedProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .select({ _id: 1, Images: 1, Product_Name: 1, Price: 1 })
      .limit(10);
    const modifiedProducts = fetchedProducts.map((product) => ({
      _id: product._id.toString(),
      Product_Name: product.Product_Name,
      Price: product.Price,
      Images: product.Images,
    }));
    return modifiedProducts;
  } catch (error) {
    console.error("Error fetching recent products:", error);
  }
};

export const getSearchResults = async ({
  searchString,
  pageNumber = 1,
  pageSize = 20,
  sortBy = "createdAt",
  sortOrder = "desc",
  category,
}: {
  searchString: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: "createdAt" | "Price";
  sortOrder?: SortOrder;
  category?: string;
}) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof Product> = category
      ? { Category: category, is_archived: false }
      : {
          is_archived: false,
        };

    if (searchString.trim() !== "") {
      query.$or = [
        { Product_Name: { $regex: regex } },
        { Description: { $regex: regex } },
        { Category: { $regex: regex } },
      ];
    }
    const select = {
      _id: 1,
      Images: 1,
      Product_Name: 1,
      Price: 1,
      Description: 1,
      Condition: 1,
    };

    const sortOptions = { [sortBy]: sortOrder };

    const searchQuery = Product.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .select(select)
      .limit(pageSize);

    const totalProductsCount = await Product.countDocuments(query);

    const products = await searchQuery.exec();

    const isNext = totalProductsCount > skipAmount + products.length;
    revalidatePath("/search");
    return {
      products,
      isNext,
      totalProductsCount,
      productsCount: products.length,
      skipAmount,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchProductDetails = async (productId: string) => {
  try {
    await connectToDB();
    const productDetails = await Product.findById(productId).populate({
      path: "Seller",
      model: User,
      select: "_id Username Phone_Number Avatar First_Name Last_Name",
    });
    if (!productDetails) {
      throw new Error("Product not found!");
    }
    return {
      _id: productDetails._id,
      Product_Name: productDetails.Product_Name,
      Price: productDetails.Price,
      Images: productDetails.Images,
      Description: productDetails.Description,
      Condition: productDetails.Condition,
      Category: productDetails.Category,
      Seller: productDetails.Seller,
      Comments: productDetails.Comments,
      Quantity: productDetails.Total_Quantity_Available,
      Expiry: productDetails.expires_in,
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
