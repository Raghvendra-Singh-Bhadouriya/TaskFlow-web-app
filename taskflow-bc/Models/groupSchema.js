import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupname: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "Auth"},
    members: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: "Auth"},
            role: {
                type: String,
                enum: ["admin", "manager", "employee"],
                default: "employee"
            }
        }
    ]
},{
    versionKey: false
})

const groupModel = mongoose.model("Group", groupSchema)

export default groupModel;