//impoting all the necessary dependencies and functions
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//making the connect database function
const connectDB = async () => {
  try {
    await mongoose.connect(
      //using the mongodb uri
      // "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8"
      "mongodb://localhost:27017/CCPS"
      
    );
    console.log("MongoDB database is connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
