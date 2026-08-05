import express from "express";
import groupModel from "../Models/groupSchema.js";
const router = express.Router();
import authentication from "../Middleware/authMiddleware.js";

//========================== Create Group =============================//
router.post("/create-group", authentication, async (req, res) => {
    try {
        const { groupname } = req.body;
        const userId = req.userId

        console.log("body: ", req.body)
        console.log("groupname: ", groupname)

        const sameTitle = await groupModel.findOne({groupname})
        if(sameTitle){
            return res.status(409).json({message: `This title name group already exists try another name`})
        }

        const newGroup = new groupModel({
            groupname,
            createdBy: userId,
            members: [
                {
                    userId,
                    role: "admin"
                }
            ]
        })

        await newGroup.save();

        res.status(200).json({
            message: `Group successfully Created`,
            data: newGroup,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: `Internal server error in create group ${error.message}`,
            success: false
        })
    }
})

//=========================== Find All Groups ==========================//
router.get("/groups",authentication, async (req, res) => {
    try {
        const userId = req.userId
        const groups = await groupModel.find({"members.userId": userId});
        //console.log("userGroup", groups)
        if(groups.length <= 0){
            return res.status(200).json({
                message: `You are not add or create in any group`
            })
        }

        res.status(200).json({
            message: `Groups fetched successfully`,
            data: groups
        })
    } catch (error) {
        res.status(500).json({
            message: `Internal server error in allGroups ${error.message}`
        })
    }
})

//============================== Find Group By groupId ==============================//
router.get("/group/:id", authentication, async (req, res) => {
    try {
        const { id } = req.params;

        const existGroup = await groupModel.findById({ _id: id })

        if(!existGroup){
            return res.status(404).json({message:`Group not exists`, success: false})
        }

        const groupMembers = await existGroup.populate({
            path: 'members.userId',
            select: 'username' 
        })

        res.status(200).json({message: `Group fetch successfully`, data: groupMembers, success: true})
    } catch (error) {
        res.status(500).json({message: `Internal server error ${error.message}`, success: false})
    }
})

router.delete("/delete-group/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const groupDelete = await groupModel.findByIdAndDelete({_id: id})

        res.status(200).json({
            message: `Group Deleted Successfully`,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error ${error.message}`,
            success: false
        })
    }
})

export default router;