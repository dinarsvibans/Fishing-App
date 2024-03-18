import mongoose from "mongoose";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log("connected to mongo_db")
    } catch (error) {
        console.log('error connection to mongoDB',error)
    }
}