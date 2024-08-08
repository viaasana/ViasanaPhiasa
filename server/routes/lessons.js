import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import Lesson from '../module/lesson.js';
import textContents from '../module/textContent.js';
import verifyToken from '../middleware/auth.js';
import letter from './letters.js';


// @route POST :id/post
// @desc add new lesson
// @access private

router.post("/:id/post", verifyToken, async (req, res) => {
    const { VietnameseName, KhmerName, EnglishName} = req.body;
    const chapter =req.params.id
    //check name
    if (!VietnameseName || !KhmerName || !EnglishName)
        return res
        .status(400)
        .json({ success: false, measge: "Name in all languages are required" });
    //check chapter
    if (!chapter)
        return res
        .status(400)
        .json({ success: false, mesage: "Chapter is required" });

    //check name
    const lessonCheck =await Lesson.find({ chapter: chapter });
    if(lessonCheck)
        for(let lesson of lessonCheck)
        {
            const nameId = lesson.name;
            const name = await textContents.findById(nameId);
            const K = name.Khmer;
            const V = name.Vietnamese;
            const E = name.English;

            if (V == VietnameseName || K == KhmerName || E == EnglishName)
            return res
                .status(400)
                .json({ success: false, mesage: "This name already taken" });
        }
    //all good
    // add name colection
    const newName = new textContents({
    Vietnamese: VietnameseName,
    Khmer: KhmerName,
    English: EnglishName,
    });
    try {
        await newName.save();
        const newLesson = new Lesson({
            name: newName.id,
            chapter: chapter,
        });
        
        await newLesson.save();

        return res
        .status(200)
        .json({ success: true, mesage: "New lesson added successfully" , id: newLesson.id});
    } catch (error) {
        console.log(error);
        await textContents.deleteOne({id: newName.id})
        return res
        .status(400)
        .json({ success: false, mesage: "Lesson added unsuccessfully" });
    }
});


// @route GET :id/
// @desc Get lesson from one chapter
// @access private

router.get("/:id", verifyToken,async (req, res)=>{
    const chapter = req.params.id
    if(!chapter)
        return res.status(400).json({success: false, mesage: "Chapter is required"})
    try {
        const lessons = await Lesson.find({chapter: chapter})
        return res.status(200).json({success: true, lessons})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, mesage: error})
    }
})


router.use("/:id/lesson", letter)

export default router
