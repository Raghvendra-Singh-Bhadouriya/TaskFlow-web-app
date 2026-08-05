import express from "express";
import taskModel from "../Models/taskSchema.js"
import authModel from "../Models/authSchema.js";
import groupModel from "../Models/groupSchema.js"
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// ================= Post Method to Upload Projects ================== //
router.post("/create_task/:groupId", authMiddleware, async (req, res) => {
    try {

        const {groupId} = req.params;
        const { title, description, dueDate, username } = req.body;

        const group = await groupModel.findById(groupId)

        const user = await authModel.findOne({username})

        const assignedPerson = group.members.find(
            (member) => member.userId.toString() === user._id.toString()
        );

        if(!assignedPerson){
            return res.status(404).json({message: `member not find`, success: false})
        }

        if(!title){
            return res.status(400).json({message: `Title is required`})
        }

        const newTask = new taskModel({
            title,
            description,
            dueDate,
            groupId: groupId,
            assignedBy: req.userId,
            assignedTo: assignedPerson.userId
        })

        await newTask.save()

        res.status(201).json({message: `Task create successfully`})
    } catch (error) {
        res.status(500).json({message: `Internal server error and Task not added ${error.message}`})
    }
})

// ================= Get Method to Fetched all tasks ================== //
router.get("/all_task/:groupId", async (req, res) => {
    try {
        const {groupId} = req.params;

        const tasks = await taskModel.find({groupId}).sort({createdAt: -1})  //decending = -1, acending = +1

        //const sortedtasks = tasks.sort((a, b) => b.createdAt - a.createdAt)
        res.status(200).json({
            message: `Tasks Fetched Successfully`,
            data: tasks
        })
    } catch (error) {
        res.status(500).json({message: `Tasks not fetched: ${error.message}`})
    }
})

//====================Single Task=====================//
router.get("/group/single-task/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const singleTask = await taskModel
        .findById(id)
        .populate({path: 'groupId', select: 'groupname'})
        .populate({path: 'assignedTo', select: 'username name'})
        .populate({path: 'assignedBy', select: 'username name'})

        if(!singleTask){
            return res.status(404).json({message: `Task not found`, success: false})
        }

        res.status(200).json({message: `Single Task fetched successfully`, success: true, data: singleTask})
    } catch (error) {
        res.status(500).json({message: `Internal server error ${error.message}`, success: false})
    }
})

//==================Get My Task by ID===================//
router.get("/assign_task/:id", async (req, res) => {
    try {
        const {id} = req.params
        const assignedBy = id;

        const myTask = await taskModel.find({assignedBy})
        console.log(myTask)
        if(!myTask){
            return res.status(404).json({message: `Task not found`})
        }

        res.status(200).json({message: `Task get successfully`, data: myTask})
    } catch (error) {
        res.status(500).json({message: `Internal server error ${error.message}`})
    }
})

// ================= Patch Method to Update Task by id ================== //
router.patch("/update_task/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const findTask = await taskModel.findById(id)
        if(!findTask){
            return res.status(404).json({
                message: `Task not found`
            })
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        console.log(updatedTask)

        res.status(200).json({
            message: `Task updated successfully`,
            data: updatedTask
        })
    } catch (error) {
        res.status(500).json({message: `Internal server error: ${error.message}`})
    }
})

// ================= Delete Method to Delete Project by id ================== //
router.delete("/delete-task/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const findProject = await taskModel.findById(id);
        if(!findProject){
            return res.status(404).json({
                message: `Task not found`
            })
        };

        const deletedProject = await taskModel.findByIdAndDelete(id)
        console.log(deletedProject)

        res.status(200).json({
            message: `Task deleted successfully`,
            data: deletedProject,
            success: true
        })
    } catch (error) {
        res.status(500).json({message: `Internal server error: ${error.message}`, success: false})
    }
})

export default router;