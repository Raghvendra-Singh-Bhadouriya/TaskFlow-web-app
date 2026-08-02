import express from "express"
import taskModel from "../Models/taskSchema.js"
//import authModel from "../Models/authSchema.js"
import authentication from "../Middleware/authMiddleware.js";

const router = express.Router();

//=====================Create Task Route==========================//
// router.post("/create_task", authentication, async (req, res) => {
//     try {
//         const { title, description, dueDate, username } = req.body;

//         const assignedPerson = await authModel.findOne({ username })

//         if(!title){
//             return res.status(400).json({message: `Title is required`})
//         }

//         const newTask = new taskModel({
//             title,
//             description,
//             dueDate,
//             userId: req.userId,
//             assignedTo: assignedPerson._id
//         })

//         await newTask.save()

//         res.status(201).json({message: `Task create successfully`, data: newTask})
//     } catch (error) {
//         res.status(500).json({message: `Internal server error and Task not added ${error.message}`})
//     }
// })

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