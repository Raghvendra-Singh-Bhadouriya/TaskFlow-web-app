import express from "express"
import taskModel from "../Models/taskSchema.js"
import authentication from "../Middleware/authMiddleware.js";

const router = express.Router();

//==================Get MyTask by Id====================//
router.get("/my_task/:id", authentication, async (req, res) => {
    try {
        const {id} = req.params;

        const myTask = await taskModel.find({
            userId: id
        })
console.log("mytask", myTask)
        if(!myTask){
            return res.status(404).json({message: `Task not Found`})
        }

        res.status(200).json({message: `Task fetched successfully`, data: myTask})
    } catch (error) {
        res.status(500).json({message: `Internal Server error ${error.message}`})
    }
})

//===================Update Task==================//
router.put("/update_task/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const existTask = await taskModel.findById(id);

        if(!existTask){
            return res.status(404).json({message: `Task not found`})
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        )

        res.status(201).json({message: `Task updated successfully`, data: updatedTask})
    } catch (error) {
        res.status(500).json({message: `Internal server error ${error.message}`})
    }
})

export default router;