import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log(x);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
  } 
};
