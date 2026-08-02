import express from "express";
import groupModel from "../Models/groupSchema.js";
import authentication from "../Middleware/authMiddleware.js";
import authModel from "../Models/authSchema.js";
const router = express.Router();

router.get("/single_group/:id", async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const groupMember = await groupModel
                            .findById(id)
                            .populate({
                                path:'members.userId',
                                select: 'username'
                            })

        console.log(groupMember)
        res.send(groupMember)
        res.status(200).send(groupMember)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch("/group/:groupId/add-member", async (req, res) => {
    try {
        const { groupId } = req.params;
        //const userId = req.userId
        const { username, role } = req.body;

        const newMember = await authModel.findOne({username})
        const group = await groupModel.findById(groupId)

        if(group.members.includes(newMember._id)){
            return res.status(409).json({message: `Already a Member`})
        }

        group.members.push({
            userId: newMember._id,
            role: role || "employee"
        })

        await group.save();

        res.status(200).json({message: `user added successfully`})
    } catch (error) {
        res.status(500).json({
            message: `Internal server error`,
            error: error.message
        })
    }
})

export default router;