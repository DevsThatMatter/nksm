import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("No MONGODB_URI found");

    if (isConnected) return console.log("Already connected to DB");

    try {
        console.log(process.env.MONGODB_URL)
        console.log("connecting to DB");
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;

        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
};