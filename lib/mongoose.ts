import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("No MONGODB_URI found");

    if (isConnected) return console.log("Already connected to DB");

    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;

        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }
};
