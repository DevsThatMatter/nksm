import { connectToDB } from "@/lib/database/mongoose";
import { Product } from "@/lib/models/product.model";
import { User } from "@/lib/models/user.model";

export const DBPopulator = async () => {
  try {
    // Connect to the database
    await connectToDB();

    const userData = [
      {
        Username: "markuz",
        First_Name: "Aryan",
        Last_Name: "Srivastava",
        Password: "password1",
        Phone_Number: "1234567890",
        Avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1706864885~exp=1706865485~hmac=378aa939b20a7ddd02374be7111d527423eecbe00df52a7f334ed6c4698db151",
        Email: "user1@example.com",
        address: "123 Main St, City, Country",
      },
      {
        Username: "geeky",
        First_Name: "Aditya",
        Last_Name: "Karna",
        Password: "password2",
        Phone_Number: "0987654321",
        Avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1706864885~exp=1706865485~hmac=378aa939b20a7ddd02374be7111d527423eecbe00df52a7f334ed6c4698db151",
        Email: "user2@example.com",
        address: "456 Elm St, Town, Country",
      },
      {
        Username: "andy",
        First_Name: "Antriksh",
        Last_Name: "Kumar Rai Bhandoria",
        Password: "password3",
        Phone_Number: "5551234567",
        Avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1706864885~exp=1706865485~hmac=378aa939b20a7ddd02374be7111d527423eecbe00df52a7f334ed6c4698db151",
        Email: "alice@example.com",
        address: "789 Oak St, Village, Country",
      },
      {
        Username: "soms",
        First_Name: "Somya",
        Last_Name: "Sati",
        Password: "password4",
        Phone_Number: "5559876543",
        Avatar:
          "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706865025~exp=1706865625~hmac=f130ec3bda68295c73a8902017f6f08b1bf9fefcae138d9087271cfcf8ed6311",
        Email: "bob@example.com",
        address: "321 Pine St, Town, Country",
      },
      {
        Username: "titties",
        First_Name: "Sahitya",
        Last_Name: "Gupta",
        Password: "password5",
        Phone_Number: "5557890123",
        Avatar:
          "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706865025~exp=1706865625~hmac=f130ec3bda68295c73a8902017f6f08b1bf9fefcae138d9087271cfcf8ed6311",
        Email: "ella@example.com",
        address: "456 Maple St, City, Country",
      },
      {
        Username: "sxxrim",
        First_Name: "Saarim",
        Last_Name: "Salim",
        Password: "password6",
        Phone_Number: "5552345678",
        Avatar:
          "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706865025~exp=1706865625~hmac=f130ec3bda68295c73a8902017f6f08b1bf9fefcae138d9087271cfcf8ed6311",
        Email: "david@example.com",
        address: "987 Birch St, Town, Country",
      },
      {
        Username: "raju",
        First_Name: "Rajan",
        Last_Name: "Kamboj",
        Password: "password7",
        Phone_Number: "5558765432",
        Avatar:
          "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706865025~exp=1706865625~hmac=f130ec3bda68295c73a8902017f6f08b1bf9fefcae138d9087271cfcf8ed6311",
        Email: "grace@example.com",
        address: "654 Cedar St, City, Country",
      },
      {
        Username: "user8",
        First_Name: "Olivia",
        Last_Name: "Martinez",
        Password: "password8",
        Phone_Number: "5554567890",
        Avatar: "avatar8.jpg",
        Email: "olivia@example.com",
        address: "789 Pine St, Village, Country",
      },
      {
        Username: "user9",
        First_Name: "James",
        Last_Name: "Taylor",
        Password: "password9",
        Phone_Number: "5557891234",
        Avatar: "avatar9.jpg",
        Email: "james@example.com",
        address: "123 Oak St, Town, Country",
      },
      {
        Username: "user10",
        First_Name: "Sophia",
        Last_Name: "White",
        Password: "password10",
        Phone_Number: "5552345678",
        Avatar: "avatar10.jpg",
        Email: "sophia@example.com",
        address: "456 Maple St, City, Country",
      },
    ];

    for (const user of userData) {
      const newUser = new User(user);
      await newUser.save();
    }

    const users = await User.find({});

    const productData = [
      {
        Seller: users[0]._id,
        Total_Quantity_Available: 1,
        Product_Name: "Mountain Bike",
        Description: "High-performance mountain bike for adventurous riders.",
        Price: 1500,
        Images: [
          "https://img.freepik.com/premium-vector/hardtail-mountain-bike-vector-isolated-white-background_124507-9669.jpg?w=1060",
          "https://img.freepik.com/premium-vector/hardtail-mountain-bike-vector-isolated-white-background_124507-9669.jpg?w=1060",
        ],
        Condition: "Brand New",
        Category: "Bicycles",
        expires_in: new Date("2024-12-31"),
        is_archived: false,
      },
      {
        Seller: users[1]._id,
        Total_Quantity_Available: 5,
        Product_Name: "Portable Cooler",
        Description: "Insulated cooler for outdoor picnics and trips.",
        Price: 50,
        Images: [
          "https://img.freepik.com/free-psd/evaporative-cooler-isolated-transparent-background_191095-25418.jpg?w=740&t=st=1706865497~exp=1706866097~hmac=a57e0365794f20d384132eabf9f80119cfea5e46b92df8c842238dfee8ebf8d3",
          "https://img.freepik.com/free-psd/evaporative-cooler-isolated-transparent-background_191095-25418.jpg?w=740&t=st=1706865497~exp=1706866097~hmac=a57e0365794f20d384132eabf9f80119cfea5e46b92df8c842238dfee8ebf8d3",
        ],
        Condition: "Like New",
        Category: "Coolers",
        expires_in: new Date("2025-06-30"),
        is_archived: false,
      },
      {
        Seller: users[2]._id,
        Total_Quantity_Available: 20,
        Product_Name: "Ballpoint Pens",
        Description: "Pack of ballpoint pens for everyday writing tasks.",
        Price: 10,
        Images: [
          "https://img.freepik.com/premium-psd/black-metal-pen-grey-background-mockup-template-your-design_34168-1389.jpg?w=360",
        ],
        Condition: "Brand New",
        Category: "Stationery",
        expires_in: new Date("2025-03-15"),
        is_archived: false,
      },
      {
        Seller: users[3]._id,
        Total_Quantity_Available: 8,
        Product_Name: "Vintage Vinyl Records",
        Description:
          "Collection of classic vinyl records in excellent condition.",
        Price: 20,
        Images: [
          "https://img.freepik.com/free-photo/vinyl-player-vinyl-record-generative-ai_169016-29061.jpg?w=1060&t=st=1706865556~exp=1706866156~hmac=1ee2024ab237cf97bfe07acae25e39050e995c1cfcfc0755af7e5212ced1c2e3",
        ],
        Condition: "Used",
        Category: "Miscellaneous",
        expires_in: new Date("2024-11-30"),
        is_archived: false,
      },
      {
        Seller: users[4]._id,
        Total_Quantity_Available: 15,
        Product_Name: "Memory Foam Mattress",
        Description: "Comfortable memory foam mattress for a restful sleep.",
        Price: 500,
        Images: [
          "https://img.freepik.com/free-photo/view-3d-mattress-with-clouds_23-2151113495.jpg?t=st=1706865573~exp=1706869173~hmac=7269ad52c08365954576e35417aa8d1551422db3c3005bcbb9b2d72c513385c7&w=360",
        ],
        Condition: "Like New",
        Category: "Mattresses",
        expires_in: new Date("2024-10-31"),
        is_archived: false,
      },
      {
        Seller: users[5]._id,
        Total_Quantity_Available: 3,
        Product_Name: "Stainless Steel Cookware Set",
        Description: "Premium cookware set made of durable stainless steel.",
        Price: 200,
        Images: [
          "https://img.freepik.com/free-photo/sophisticated-kitchen-utensils-ensemble-seamlessly-integrating-utility-elegance-your-culinary-endeavors_157027-2476.jpg?t=st=1706865597~exp=1706869197~hmac=ff57ef9ae254e207ef12ea4e6f27262b1bb291440adf498e6c432e4b332d5fda&w=1380",
        ],
        Condition: "Brand New",
        Category: "Kitchenware",
        expires_in: new Date("2024-09-30"),
        is_archived: false,
      },
      {
        Seller: users[6]._id,
        Total_Quantity_Available: 12,
        Product_Name: "Acoustic Guitar",
        Description: "Quality acoustic guitar for music enthusiasts.",
        Price: 300,
        Images: [
          "https://img.freepik.com/free-photo/yellow-guitar-with-word-guitar-front_1340-33086.jpg?t=st=1706865614~exp=1706869214~hmac=17de9b6111c827653ace680792306fe6c96c1167e4057151c05d70932b4cb626&w=360",
          "https://img.freepik.com/free-photo/yellow-guitar-with-word-guitar-front_1340-33086.jpg?t=st=1706865614~exp=1706869214~hmac=17de9b6111c827653ace680792306fe6c96c1167e4057151c05d70932b4cb626&w=360",
        ],
        Condition: "Used",
        Category: "Instruments",
        expires_in: new Date("2025-04-30"),
        is_archived: false,
      },
      {
        Seller: users[7]._id,
        Total_Quantity_Available: 25,
        Product_Name: "Smartphone",
        Description: "Latest smartphone model with advanced features.",
        Price: 800,
        Images: [
          "https://img.freepik.com/free-photo/digital-smart-phone-futuristic-background_1409-4092.jpg?size=626&ext=jpg&ga=GA1.1.650872015.1696520298&semt=ais_ai_generated",
        ],
        Condition: "Brand New",
        Category: "Electronics",
        expires_in: new Date("2024-08-31"),
        is_archived: false,
      },
      {
        Seller: users[8]._id,
        Total_Quantity_Available: 6,
        Product_Name: "Coffee Maker",
        Description: "Automatic coffee maker for home use.",
        Price: 50,
        Images: [
          "https://img.freepik.com/free-photo/barista-making-cup-coffee_23-2150698731.jpg?t=st=1706865656~exp=1706869256~hmac=85e961e40af60776953d0b2ad025c10795995adc6270131298e4c7d32e36e713&w=740",
        ],
        Condition: "Used",
        Category: "Electronics",
        expires_in: new Date("2024-07-31"),
        is_archived: false,
      },
      {
        Seller: users[9]._id,
        Total_Quantity_Available: 18,
        Product_Name: "Camping Tent",
        Description: "Spacious camping tent for outdoor adventures.",
        Price: 150,
        Images: [
          "https://img.freepik.com/free-photo/tent-by-lake-with-mountain-background_1340-32744.jpg?size=626&ext=jpg&ga=GA1.1.650872015.1696520298&semt=ais_ai_generated",
        ],
        Condition: "Brand New",
        Category: "Miscellaneous",
        expires_in: new Date("2025-02-28"),
        is_archived: false,
      },
    ];

    await Product.insertMany(productData);
    await User.insertMany(userData);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error creating user and product:", error);
  }
};
