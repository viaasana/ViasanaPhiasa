import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/auth.js';
import Groups from '../module/Groups.js';
import textContents from '../module/textContent.js';
import Test from '../module/test.js';
import User from '../module/user.js';



// add group
router.post("/",verifyToken, async (req, res) => {
    const { Vietnamese, Khmer, English } = req.body;
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, message: "Name in all languages are required" });

    const nameCheck = await textContents.findOne({ Vietnamese: Vietnamese, Khmer: Khmer, English: English })

    if (nameCheck) {
        return res
            .status(400)
            .json({ success: false, message: "This name already taken" })
    }
    try{
        const newName = new textContents({
            Vietnamese,
            Khmer,
            English
        })
        await newName.save()
        const newGroup = new Groups({
            name: textContents.id
        })
        await newGroup.save()
        return res.status(200).json({success: true, message: "new group added with id: " + newGroup.id})
    }catch(error){
        return res.status(200).json({success: false, error})
    }
})

// delete group
router.delete("/:groupId",verifyToken, async(req, res)=>{
    const groupId = req.params.groupId
    const group = await Groups.findById(groupId)
    if(!group)
        return res.status(404).json({success: false, message: "not found group with id: "+ groupId})
    try{
        await Groups.findByIdAndDelete(groupId)
        return res.status(200).json({success: true, message: "deleted group id: "+ groupId})
    }catch(error){
        return res.status(400).json({success:false, error})
    }
})

// get groups
router.get("/",verifyToken, async(req, res)=>{
    try{
        const groups = await Groups.find()
        let respone = []
        await Promise.all(
            groups.map(async(group)=>{
                const tests = await Test.find({group: group.id})
                const users = await User.find({group: group.id})
                const name = await textContents.findById(group.name)
                respone.push({name, testCount: tests.length, userCount: users.length})
            })
        )
        return res.status(200).json({success: true, groups: respone})
    }catch(error){
        return res.status(400).json({success: false, error})
    }
})


//get one group
router.get("/:groupId",verifyToken, async(req, res)=>{
    const groupId = req.params.groupId
    try{
        const group = await Groups.findById(groupId)
        if(!group)
            return res.status(404).json({success: false, message: "not found group id:" + groupId})
        const tests = await Test.find({group: groupId})
        const users = await User.find({group: groupId})
        const name =await textContents.findById(group.name)
        return res.status(200).json({success: true, group:{name, testCount: tests.length, usersCount: users.length}})
    }catch(error){
        return res.status(400).json({success: false, error})
    }
})

export default router