"use server";

import { Product } from "../models/product.model";
import { connectToDB } from "../database/mongoose";
import { FilterQuery, SortOrder, Types, mongo } from "mongoose";
import SearchCard from "@/app/components/Search/SearchCard";
import { CategoryEnum, SortBy } from "@/types";
import { FilterQuery, SortOrder } from "mongoose";
import { connectToDB } from "../database/mongoose";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { CategoryEnum, SortBy, category } from "@/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SavedProduct } from "@/app/components/Navbar/SavedItems";

export const fetchRecentProducts = async () => {
  try {
    await connectToDB();
    const fetchedProducts = await Product.find({})
      .limit(50)
      .select({
        _id: 1,
        Images: 1,
        Product_Name: 1,
        Price: 1,
        Description: 1,
        Negotiable: 1,
        Condition: 1,
      })
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

export async function fetchSavedProduct() {
  try {
    const email = (await auth())?.user?.email;
    if (!email) {
      return redirect("/login");
    }
    await connectToDB();
    const user = await User.findOne({ Email: email });
    if (!user) {
      throw new Error("User not found");
    }

    const savedProducts = user.Saved_Products as Types.ObjectId[];

    const svdProducts = await Promise.all(
      savedProducts.map(async (productId) => {
        const product = await Product.findById(productId);
        return {
          _id: product._id.toString(),
          Image: product.Images[0],
          Condition: product.Condition,
          Price: product.Price,
          Negotiable: product.Negotiable,
          Product_Name: product.Product_Name,
        };
      }),
    );
    const savedItems = svdProducts.reduce((mp, product) => {
      mp.set(product._id, product);
      return mp;
    }, new Map<string, SavedProduct>());

    return savedItems;
  } catch (error) {
    console.log("ERROR_WHILE_FETCHING_SAVED_PRODUCTS", error);
    throw error;
  }
}

// _id: product._id.toString(),
// Image: product.Images[0],
// Condition: product.Condition,
// Price: product.Price,
// Negotiable: product.Negotiable,
// Product_Name: product.Product_Name,

export async function removeSavedProduct({ productId }: { productId: string }) {
  try {
    const email = (await auth())?.user?.email ?? "";
    await connectToDB();

    const user = await User.findOne({ Email: email });

    if (!user) {
      return redirect("/login");
    }

    const savedProducts = user.Saved_Products.map(
      (id: Types.ObjectId) => new mongo.ObjectId(id.toString()),
    );

    const updatedSavedProducts = savedProducts.filter(
      (id: Types.ObjectId) => id.toString() !== productId,
    );

    user.Saved_Products = updatedSavedProducts;

    await user.save();
    return {
      error: null,
      msg: "Removed successfully",
    };
  } catch (error) {
    console.error("Error removing product:", error);
    return {
      error: null,
      msg: "Server error, try later",
    };
  }
}

export async function saveProduct({ productId }: { productId: string }) {
  try {
    await connectToDB();
    const currentUserEmail = (await auth())?.user?.email;
    await User.updateOne(
      { Email: currentUserEmail },
      { $push: { Saved_Products: new mongo.ObjectId(productId) } },
    );
    return {
      msg: "Product saved",
      error: null,
    };
  } catch (error) {
    console.log("ERROR_WHILE_SAVING_PRODUCT", error);
    return {
      msg: null,
      error: "Server error, try later",
    };
  }
}

export async function getSaved({ productId }: { productId: string }) {
  try {
    const currentUserEmail = (await auth())?.user?.email;
    if (!currentUserEmail) {
      return redirect("/login");
    }
    const savedProducts: Types.ObjectId[] = (
      await User.findOne({ Email: currentUserEmail })
    ).Saved_Products;
    return savedProducts.includes(new mongo.ObjectId(productId));
  } catch (error) {
    console.log("ERROR_WHILE_CHECKING_SAVED_PRODUCT", error);
    throw error;
  }
}
