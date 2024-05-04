"use server";

import SearchCard from "@/app/components/Search/SearchCard";
import { CategoryEnum, SortBy } from "@/types";
import { FilterQuery, SortOrder } from "mongoose";
import { connectToDB } from "../database/mongoose";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
export const fetchRecentProducts = async () => {
  try {
    await connectToDB();
    const fetchedProducts = await Product.find({})
      .limit(50)
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
      .limit(50);
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

const sortOptions = (
  sortBy?: SortBy,
): { createdAt: SortOrder } | { Price: SortOrder } => {
  switch (sortBy) {
    case "newest":
      return { createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    case "high":
      return { Price: -1 };
    case "low":
      return { Price: 1 };
    default:
      return { createdAt: 1 };
  }
};

export const getSearchResults = async ({
  searchString,
  pageNumber = 1,
  pageSize = 20,
  sortBy = "newest",
  category,
}: {
  searchString: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortBy;
  category?: keyof typeof CategoryEnum;
}) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    console.log("pageNumber", pageNumber);
    console.log("skipAmount", skipAmount);

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
      Negotiable: 1,
    };

    const searchQuery = Product.find(query)
      .select(select)
      .sort(sortOptions(sortBy))
      .limit(pageSize)
      .skip(skipAmount);

    const totalProductsCount = await Product.countDocuments(query);

    const products = await searchQuery.exec();
    const productsData = products.map((product) => (
      <SearchCard
        key={product._id.toString()}
        id={product._id}
        image_url={product.Images[0]}
        name={product.Product_Name}
        price={product.Price}
        description={product.Description}
        condition={product.Condition}
        negotiable={product.Negotiable}
      />
    ));

    const isNext = totalProductsCount > skipAmount + products.length;
    return {
      productsData,
      isNext,
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
      select: "_id Username Phone_Number Avatar Name Email",
    });
    if (!productDetails) {
      throw new Error("Product not found!");
    }
    return {
      _id: productDetails._id,
      Negotiable: productDetails.Negotiable,
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

export const fetchOrderHistory = async (email: string) => {
  try {
    await connectToDB();

    const userInfo = await User.findOne({ Email: email })
      .select({
        Ordered_Products: true,
        Owned_Products: true,
      })
      .populate({
        path: "Ordered_Products Owned_Products",
        model: Product,
        select: "Images Product_Name Price Description Condition Negotiable",
      });

    console.log(userInfo);
    return userInfo;
  } catch (e: unknown) {
    console.log("Something went wrong.");
    throw e;
  }
};
