import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import userRoute from "./Routes/userRoute.js";
import taskRoute from "./Routes/taskRoute.js";
import authRoute from './Routes/authRoute.js';
import myRoute from "./Routes/myTaskRoute.js";
import groupRoute from "./Routes/groupRoute.js";
import groupMembersRoute from "./Routes/groupMembersRoute.js";
import connection from "./config/db.js";
//import { connect } from "mongoose";

const PORT = process.env.PORT || 8080
const server = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-flow-web-app-gray.vercel.app',
];

server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));

server.use(express.json())

server.use("/", userRoute);
server.use("/", taskRoute);
server.use("/", myRoute);
server.use("/", authRoute);
server.use("/", groupRoute);
server.use("/", groupMembersRoute);


server.get("/", (_, res) => {
    console.log("This is Home Page")
    res.status(200).json({message: `This is Home Page`})
})

server.listen(PORT, async (req, res) => {
    try {
        await connection();
        console.log(`✅ Server is running on port ${PORT}`)
    } catch (error) {
        console.log(`❌ Server failed to running: ${error.message}`)
    }
})