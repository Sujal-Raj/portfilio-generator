import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/portfilioGenerator");
    console.log("Connected")
    } catch (error) {
        console.log(error)
    }
}