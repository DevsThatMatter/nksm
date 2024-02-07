import { Product } from "../models/product.model";
import { connectToDB } from "../database/mongoose";
export const fetchRecentProducts = async () => {
    try {
        connectToDB();
        console.log('Fetching recent products')
        const fetchedProducts = await Product.find({}).sort({ createdAt: -1 }).limit(10);
        const modifiedProducts = fetchedProducts.map((product) => ({
            Seller: product.Seller.toString(),
            Total_Quantity_Available: product.Total_Quantity_Available,
            Product_Name: product.Product_Name,
            Description: product.Description,
            Price: product.Price,
            Images: product.Images,
            Condition: product.Condition,
            Category: product.Category,
            expires_in: product.expires_in,
            is_archived: product.is_archived,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
          }));
          return modifiedProducts;
    } catch (error) {
      console.error('Error fetching recent products:', error);
    }
  };