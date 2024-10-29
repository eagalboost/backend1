import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import serviceRout from "./routes/service.route.js";
import orderRout from "./routes/order.route.js";
import conversationRout from "./routes/conversation.route.js";
import messageRout from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRout from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://eaglesboost.com", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/auth", authRout);
app.use("/api/services", serviceRout);
app.use("/api/orders", orderRout);
app.use("/api/conversations", conversationRout);
app.use("/api/messages", messageRout);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB is Connected...");
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 8800; 

app.listen(PORT, () => {
  connectDB();
  console.log(`Backend server is running on port ${PORT}...`);
});
