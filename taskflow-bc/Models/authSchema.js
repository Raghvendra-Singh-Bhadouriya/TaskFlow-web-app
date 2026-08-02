import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {type: String, unique: true, lowercase: true, required: true},
    name: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    mob: {type: String, required: true},
    password: {type: String, required: true},
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth"
        }
    ],
    groups:  [
        {
            groupId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group"
            },
            role: {
                type: String,
                enum: ["admin", "member"],
                default: "member"
            }
        }
    ]
},{
    versionKey: false,
    timestamps: true
})

const authModel = mongoose.model("Auth", authSchema)

export default authModel ;