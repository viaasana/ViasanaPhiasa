
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import Chapter from '../module/chapter.js';
import textContents from '../module/textContent.js';
import verifyToken from '../middleware/auth.js';
import lesson from './lessons.js';
import Delete from '../function/delete.js';
import Assignment from "./assignment.js"

// @route GET api/courses/
// @desc get all chapter
// @access private


router.get("/", verifyToken, async (req, res) => {

    const language = req.query.language
    try {
        let dataReturn = []
        const chapters = await Chapter.find()
        await Promise.all(
            chapters.map(async (chapter) => {
                const name = await textContents.findById(chapter.name)
                if (language == "Vietnamese")
                    dataReturn.push({ id: chapter.id, name: name.Vietnamese, lessonCout: chapter.lessonCount, createAt: chapter.createdAt })
                else if (language == "Khmer")
                    dataReturn.push({ id: chapter.id, name: name.Khmer, lessonCout: chapter.lessonCount, createAt: chapter.createdAt })
                else if (language == "English")
                    dataReturn.push({ id: chapter.id, name: name.English, lessonCout: chapter.lessonCount, createAt: chapter.createdAt })
            })
        )
        return res.status(200).json({ success: true, chapters: dataReturn })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, mesage: error })
    }
})
// @route POST api/coursespost
// @desc Create new chapter
// @access private

router.post("/post", verifyToken, async (req, res) => {
    const { Vietnamese, Khmer, English } = req.body;
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, message: "Name in all languages are required" });

    //check if existing chapter with this name
    const nameCheck = await textContents.findOne({ Vietnamese: Vietnamese, Khmer: Khmer, English: English })

    if (nameCheck) {
        return res
            .status(400)
            .json({ success: false, message: "This name already taken" })
    }

    // add name colection
    const newName = new textContents({
        Vietnamese: Vietnamese,
        Khmer: Khmer,
        English: English,
    });
    await newName.save();
    try {

        const newChapter = new Chapter({
            name: newName.id,
        });

        await newChapter.save();

        return res
            .status(200)
            .json({ success: true, message: "New chapter added successfully", id: newChapter.id });
    } catch (error) {
        console.log(error);
        await textContents.deleteOne({ id: newName.id })
        return res
            .status(400)
            .json({ success: false, message: "Chapter added unsuccessfully" });
    }
});

// @route DELETE api/courses/delete
// @desc Delete one chapter
// @access private
router.delete("/", verifyToken, async (req, res) => {
    const { chapterId } = req.body

    try {
        await Delete("Chapter", chapterId)
        return res.status(200).json({ success: true, mesage: "Delete successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: true, mesage: "Delete unsuccessfully" })
    }
})

router.use("/chapter", lesson)
router.use("/assignment", Assignment)

export default router