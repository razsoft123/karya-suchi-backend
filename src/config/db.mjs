import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("DATABASE: connecting");
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("DATABSE: connected");
    } catch (err) {
        console.error("ERROR: database connection fail. ", err);
    }
}
const disconnectDB = async () => {
    try {
        console.log("DATABASE: disconnecting");
        await mongoose.disconnect();
        console.log("DATABSE: disconnected");
    } catch (err) {
        console.error("ERROR: Database can't connect ", err);
    }
}

export { connectDB, disconnectDB };