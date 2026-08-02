import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        reuired: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    }
},{
    versionKey: false
})

const taskModel = mongoose.model("Project", taskSchema)

export default taskModel ;