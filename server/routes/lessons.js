import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import Lesson from '../module/lesson.js';
import textContents from '../module/textContent.js';
import verifyToken from '../middleware/auth.js';
import letter from './letters.js';
import Chapter from '../module/chapter.js';
import Delete from '../function/delete.js';


// @route POST :id/
// @desc get lesson with chapter id
// @access private

router.get("/:id", verifyToken, async (req, res) => {
    const language = req.query.language
    const chapterId = req.params.id
    if (!chapterId)
        return res.status(400).json({ success: false, message: "Chapter id is required" })
    try {
        let dataReturn = []
        const lessons = await Lesson.find({ chapter: chapterId })
        await Promise.all(
            lessons.map(async (lesson) => {
                const name = await textContents.findById(lesson.name)
                dataReturn.push({ id: lesson.id, name: name, chapter: chapterId, createAt: lesson.createdAt, letterCount: lesson.letterCount || 0 })
            })
        )
        return res.status(200).json({ success: true, lessons: dataReturn })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error })
    }
});


// @route GET :id/post
// @desc Add new lesson
// @access private

router.post("/:id/post", verifyToken, async (req, res) => {
    const chapter = req.params.id
    const { Vietnamese, Khmer, English } = req.body
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, message: "Name in all languages are required" });
    if (!chapter)
        return res.status(400).json({ success: false, mesage: "Chapter is required" })

    const nameCheck = await textContents.findOne({ Vietnamese: Vietnamese, Khmer: Khmer, English: English })
    if (nameCheck)
        return res
            .status(400)
            .json({ success: false, message: "This name already taken" })

    const newName = new textContents({
        Vietnamese: Vietnamese,
        Khmer: Khmer,
        English: English
    })
    await newName.save()
    try {
        const newLesson = new Lesson({
            name: newName.id,
            chapter: chapter
        })

        await newLesson.save()
        const parent = await Chapter.findById(chapter)
        parent.lessonCount++
        parent.save()
        return res.status(200).json({ success: true, message: "Lesson added successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, mesage: error })
    }
})

// @route DELETE :id/
// @desc Delete lesson with chapter id
// @access private
router.delete("/:lessonId", verifyToken, async (req, res) => {
    const lessonId = req.params.lessonId
    const thisLesson = await Lesson.findById(lessonId)
    if (thisLesson) {
        const thisParent = await Chapter.findById(thisLesson.chapter)
        try {
            thisParent.lessonCount--
            await thisParent.save()
            await Delete("Lesson", lessonId)
            console.log("lesonid:", lessonId)
            return res.status(200).json({ success: true, mesage: `Delete ${lessonId} successfully` })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, mesage: "Delete unsuccessfully" })
        }
    } else {
        return res.status(404).json({ success: false, mesage: "Not found this Lesson" })
    }
})




router.use("/:id/lesson", letter)

export default router
