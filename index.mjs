import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {
    // console.log("Request is here: ", req);
    res.statusCode = 200;
    return res.end("Here is a response");
});

server.listen(8000, '127.0.0.1', () => {
    console.log(`server is started at host: ${process.env.HOST} port: ${process.env.PORT}`);
});