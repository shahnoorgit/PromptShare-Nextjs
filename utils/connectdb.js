import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("database connection established already");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompt_share",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("database connection established");
  } catch (error) {
    console.log(error.message);
  }
};
