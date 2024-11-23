import mongoose from "mongoose";

const db_url = process.env.MONGO_URL as string;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(db_url, {
      authSource: "admin",
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS
      }
    });
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("error", (error) => {
  console.log(error);
});

export default connectDB;
