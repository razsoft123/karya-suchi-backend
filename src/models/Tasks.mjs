import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        default: null
    }
}, {
    timestamps: true
})

export default mongoose.Model("task", taskSchema);