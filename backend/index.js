import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/todoroute.js";
import userRoute from "../backend/routes/userroute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4002;
const DB_URL = process.env.MONGODB_URI;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


//conect database
async function connecttoDb() {
  try {
    await mongoose.connect(DB_URL);
    console.log("connented to mongodb");
  } catch (error) {
    console.log(error);
  }
}
connecttoDb(); 

//routes

app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
