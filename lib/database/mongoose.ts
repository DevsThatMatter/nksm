import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("No MONGODB_URL found");

    if (isConnected) return console.log("Already connected to MongoDB");

    try {
        await mongoose.connect(process.env.MONGODB_URL, {dbName: "NKSMDB", connectTimeoutMS: 10000});
        isConnected = true;

        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
};