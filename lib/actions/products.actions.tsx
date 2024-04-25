"use server";

import { SavedProduct } from "@/app/components/Navbar/SavedItems";
import SearchCard from "@/app/components/Search/SearchCard";
import { auth } from "@/auth";
import { CategoryEnum, SortBy } from "@/types";
import { FilterQuery, SortOrder, mongo } from "mongoose";
import { redirect } from "next/navigation";
import { connectToDB } from "../database/mongoose";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";

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
      isArchived: productDetails.is_archived,
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export async function fetchSavedProduct() {
  try {
    const savedItems = new Map<string, SavedProduct>();
    const email = (await auth())?.user?.email;
    if (!email) {
      return savedItems;
    }
    await connectToDB();
    const saved = (await User.aggregate([
      {
        $match: {
          Email: email,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "Saved_Products", // Use the unwound element for comparison (if applicable)
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $project: {
          _id: 0,
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                _id: { $toString: "$$product._id" },
                Image: { $arrayElemAt: ["$$product.Images", 0] },
                Condition: "$$product.Condition",
                Price: "$$product.Price",
                Negotiable: "$$product.Negotiable",
                Product_Name: "$$product.Product_Name",
              },
            },
          },
        },
      },
    ])) as [{ products: SavedProduct[] }];

    saved[0].products.forEach((savedProduct) => {
      savedItems.set(savedProduct._id, savedProduct);
    });

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

export async function removeSavedProduct(productId: string) {
  try {
    const email = (await auth())?.user?.email;
    if (!email) return redirect("/login");
    await connectToDB();

    await User.findOneAndUpdate(
      { Email: email },
      { $pull: { Saved_Products: productId } },
    );
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

export async function saveProduct(productId: string) {
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

export async function getProductById({ productId }: { productId: string }) {
  try {
    await connectToDB();

    const productDetails = await Product.findById(productId);

    if (!productDetails) {
      throw new Error("Product not found");
    }
    const prod = {
      Product_Name: productDetails.Product_Name,
      Images: productDetails.Images,
      Description: productDetails.Description,
    };

    return prod;
  } catch (error) {
    console.log("ERROR_WHILE_GETTING_PRODUCT_BY_ID", error);
    throw error;
  }
}
