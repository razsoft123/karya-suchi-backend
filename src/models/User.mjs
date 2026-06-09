import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    refreshToken: {
        type: String,
        default: null,
    },

    defaultWorkspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspace",
        required: true,
    }

}, {
    timestamp: true
});

const User = mongoose.model("user", userSchema);
export default User;