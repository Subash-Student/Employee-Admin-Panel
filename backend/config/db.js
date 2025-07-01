import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()



const connectDB = async () => {
  
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

export default connectDB;