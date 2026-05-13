import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error("ERROR: database connection fail. ", err);
    }
}
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (err) {
        console.error("ERROR: Database can't connect ", err);
    }
}

export { connectDB, disconnectDB };