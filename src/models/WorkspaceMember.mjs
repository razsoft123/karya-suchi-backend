import mongoose from "mongoose";

const workspaceMemberSchema = mongoose.Schema({

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },

    memeber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    role: {
        type: String,
        enum: ["owner", "admin", "memeber"]
    },

    access: {
        type: String,
        enum: ["view", "comment", "edit"]
    }
}, {
    timestamps: true
})

const WorkspaceMember = mongoose.model("WorkspaceMember", workspaceMemberSchema);

export default WorkspaceMember;