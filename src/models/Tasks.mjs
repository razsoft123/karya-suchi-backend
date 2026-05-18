import mongoose from "mongoose";
import User from "./User.mjs";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String
    },

    user: {
        type: User,
        required: true
    }
}, {
    timestamp: true
})

export default mongoose.Model("task", taskSchema);