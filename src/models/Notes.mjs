import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Untitled"
    },

    description: {
        type: String,
        default: ""
    },

    body: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspace",
        required: true
    }
}, { timestamps: true })

const Note = mongoose.Model("note", notesSchema);
export default Note;