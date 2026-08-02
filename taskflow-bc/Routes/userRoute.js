import express from "express";
const router = express.Router();
import authModel from "../Models/authSchema.js";
import authentication from "../Middleware/authMiddleware.js";


router.get("/search-users", async (req, res) => {
    try {
        const query = req.query.q
        if(!query){
            return res.status(200).json({ data: [] })
        }

        const user = await authModel.find({
            username: { $regex: query, $options: "i" }
        }).select("username name email friends").limit(10);

        res.status(200).json({
            message: `User Searching...`,
            data: user
        })
    } catch (error) {
        res.status(500).json({message: `Internal server error: ${error.message}`})
    }
})

router.post("/add-friend/:id", authentication, async (req, res) => {
    try {
        const UserId = req.params.id
        const currentUserId = req.userId

        const currentUser = await authModel.findById(currentUserId);
        if(!currentUser){
            return res.status(404).json({
                message: `User not found`
            })
        }

        const UserIdExists = await authModel.findById(UserId);
        if(!UserIdExists){
            return res.status(404).json({
                message: `Person not found`
            })
        }



        const friendExists = await authModel.findOne({
            _id: currentUserId,
            friends: UserId
        })
        if(friendExists){
            return res.status(409).json({
                message: `Already a friend`
            })
        }

        if(UserId === currentUserId){
            return res.status(400).json({
                message: `You cannot add yourself as a friend`
            })
        }

        const friendAdded = await authModel.findByIdAndUpdate(
            currentUserId, 
            {
                $addToSet: { friends: UserId }
            },
            { new: true }
        )

        res.status(201).json({
            message: `Friend added successfully`,
            data: friendAdded
        })
    } catch (error) {
        res.status(500).json({message: `Internal server error: ${error.message}`})
    }
})

router.get("/search-friend", async (req, res) => {
    try {
        const query = req.query.q

        const friend = await authModel.find({
            username: { $regex: query, $options: "i" }
        }).select("username name email")

        res.status(200).json({
            message: `Friend searched`,
            data: friend
        })
    } catch (error) {
        res.status(500).json({message: `Internal Server Error ${error.message}`})
    }
})

export default router;