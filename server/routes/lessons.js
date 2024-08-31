import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import Lesson from '../module/lesson.js';
import textContents from '../module/textContent.js';
import verifyToken from '../middleware/auth.js';
import letter from './letters.js';


// @route POST :id/
// @desc get lesson with chapter id
// @access private

router.post("/:id/", verifyToken, async (req, res) => {
    const language = req.query.language
    const chapterId = req.params.id
    try {
        let dataReturn = []
        const lessons = await Lesson.find({chapter: chapterId})
        await Promise.all(
            lessons.map(async(lesson)=>{
                const name = await textContents.findById(lesson.name)
                if (language == "VietNamese")
                    dataReturn.push({ id: lesson.id, name: name.Vietnamese })
                else if (language == "Khmer")
                    dataReturn.push({ id: lesson.id, name: name.Khmer })
                else if (language == "English")
                    dataReturn.push({ id: lesson.id, name: name.English })
            })
        )
        return res.status(200).json({success: true, lessons: dataReturn})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, message: error})
    }
});


// @route GET :id/post
// @desc Add new lesson
// @access private

router.get("/:id/post", verifyToken,async (req, res)=>{
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

// @route DELETE :id/
// @desc Delete lesson with chapter id
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
    const { lessonId } = req.params.id

    const deleteChapter = await Chapter.findById(lessonId)
    try {
        // //await axios.delete(`/api/Courses/chapter/${lessonId}`)
        // await textContents.findByIdAndDelete(deleteChapter.name)
        // await Chapter.findByIdAndDelete(lessonId)
        return res.status(200).json({ success: true, mesage: "Delete successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: true, mesage: "Delete unsuccessfully" })
    }
})




router.use("/:id/lesson", letter)

export default router
