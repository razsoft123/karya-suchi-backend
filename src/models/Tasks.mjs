import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String
    }
}, {
    timestamp: true
})

export default mongoose.Model("task", taskSchema);