import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("No MONGODB_URI found");

    if (isConnected) return console.log("Already connected to DB");

    try {
        await mongoose.connect(process.env.MONGODB_URL, {dbName: "NKSMDB"});
        isConnected = true;

        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
};