import dotenv from "dotenv";
import express from "express";
import { connectDB, disconnectDB } from "./config/db.mjs";


dotenv.config();

const app = express();
app.use(express.json());

// Basic routes
app.get("/ping", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "server is running"
    })
});

app.get("/",)

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8000";

// connecting to database
connectDB();

const server = app.listen(PORT, HOST, () => {
    console.log(`SERVER: started\n HOST: ${HOST}\n PORT: ${PORT} \n LINK: http://${HOST}:${PORT}`);
});


// Closing connection to database when server closes