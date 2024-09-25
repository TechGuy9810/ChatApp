import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectMongo = async()=>{
    try{
         await mongoose.connect(process.env.MONGO_DB_URL);
         console.log("connected to mongodb");
    }
    catch(error)
    {
        console.log("Error connecting to DB")
    }
};

export default connectMongo;