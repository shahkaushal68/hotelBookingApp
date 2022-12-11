import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
import hotelRouter from "./routes/hotelRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import roomRouter from "./routes/roomRoute.js";

//------------Global Middlewares--------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 4000; // define Port where run all api

//------------ Databse Connection --------------------//
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connection Successfully"))
  .catch((error) => console.log(error));

// These both condition test when some probelm from MongoDb side. like delete Ip addrees and test

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

//mongoose.connection.on("connected", () => {
//console.log("Mongodb connected");
//});

//---------------------------------------------//

// ----------Routing Middlewares-------------------//

app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
