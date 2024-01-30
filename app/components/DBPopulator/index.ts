import { connectToDB } from "@/lib/database/mongoose";
import { Product } from "@/lib/models/product.model";
import { User } from "@/lib/models/user.model";

export const DBPopulator = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Create a new user
        const newUser = new User({
          Username: "aryansri69",
          First_Name: "Nunu",
          Last_Name: "Doe",
          Password: "jav69",
          Email: "aryansiri@example.com",
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Create a new product
        const newProduct = new Product({
          Product_ID: 1,
          Seller: savedUser._id, // Assign the user's _id as the seller
          Total_Quantity_Available: 10,
          Product_Name: "Hero bicycle",
          Description: "This is my new bicycle",
          Price: 19.99,
          Condition: 'Brand New',
          Images: ["https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg"],
          Category: "Electronics", // Replace with the desired category
          expires_in: new Date("2024-2-31"), // Replace with the desired expiration date
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        console.log("User created:", savedUser);
        console.log("Product created:", savedProduct);
      } catch (error) {
        console.error("Error creating user and product:", error);
      }
}
