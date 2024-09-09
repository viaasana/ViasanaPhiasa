import express from 'express'
const router = express.Router()

import Letter from '../module/letter.js'
import Lesson from '../module/lesson.js'
import textContents from '../module/textContent.js'
import verifyToken from '../middleware/auth.js'
import upload from '../upload.mjs'
import Image from '../module/image.js'
import Video from '../module/video.js'
import Sound from '../module/sounds.js'
import deleteFile from '../function/deleteFile.js'
import Delete from '../function/delete.js'

// @route POST :id/post
// @desc add new lettter
// @access private

router.post("/:id/post", verifyToken, async (req, res) => {
    const { Vietnamese, Khmer, English } = req.body;
    const lesson = req.params.id
    //check name
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, message: "Name in all languages are required" });
    //check lesson
    if (!lesson)
        return res
            .status(400)
            .json({ success: false, message: "lesson is required" });

    //check name
    const lessonCheck = await Letter.find({ lesson: lesson });
    if (lessonCheck)
        for (let lesson of lessonCheck) {
            const nameId = lesson.name;
            const name = await textContents.findById(nameId);
            const K = name.Khmer;
            const V = name.Vietnamese;
            const E = name.English;

            if (V == Vietnamese || K == Khmer || E == English)
                return res
                    .status(400)
                    .json({ success: false, message: "This name already taken" });
        }
    //all good
    // add name colection
    const newName = new textContents({
        Vietnamese: Vietnamese,
        Khmer: Khmer,
        English: English,
    });
    try {
        await newName.save();
        const parent = await Lesson.findById(lesson)
        parent.letterCount++
        parent.save()

        const newLetter = new Letter({
            name: newName.id,
            lesson: lesson
        });

        await newLetter.save();
        return res
            .status(200)
            .json({ success: true, message: "New letter added successfully", id: newLetter.id });
    } catch (error) {
        console.log(error);
        await textContents.deleteOne({ id: newName.id })
        return res
            .status(400)
            .json({ success: false, message: "Letter added unsuccessfully" });
    }
});



// @route POST :lessonId/uploadImage
// @desc Upload new file
// @access private
router.post("/:id/:letterId/uploadimage", verifyToken, async (req, res) => {
    const { Vietnamese, Khmer, English, path } = req.body
    const letter = req.params.letterId
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, measge: "Name in all languages are required" })
    if (!path)
        return res
            .status(400)
            .json({ success: false, measge: "path is required" })

    try {
        const newFile = await upload(path)

        const newName = new textContents({
            Vietnamese: Vietnamese,
            Khmer: Khmer,
            English: English,
        });
        await newName.save();

        const newImage = new Image({
            fileId: newFile.id,
            description: newName.id,
            letter: letter
        })
        await newImage.save()
        return res.status(200).json({ success: true, message: "Upload succesfully" })
    } catch (error) {
        await textContents.findByIdAndDelete(newName.id)
        await Image.findByIdAndDelete(newFile.id)
        return res.status(400).json({ success: false, error })
    }


})

// @route POST :lessonId/uploadvideo
// @desc Upload new file
// @access private
router.post("/:id/:letterId/uploadvideo", verifyToken, async (req, res) => {
    const { Vietnamese, Khmer, English, path } = req.body
    const letter = req.params.letterId
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, measge: "Name in all languages are required" })
    if (!path)
        return res
            .status(400)
            .json({ success: false, measge: "path is required" })

    const uploadResul = await upload(path)
    if (!uploadResul.success)
        return uploadResul
    const newFile = uploadResul
    const newName = new textContents({
        Vietnamese: Vietnamese,
        Khmer: Khmer,
        English: English,
    });
    await newName.save();
    try {

        const newVideo = new Video({
            fileId: newFile.file.id,
            description: newName.id,
            letter: letter
        })
        await newVideo.save()
        return res.status(200).json({ success: true, message: "Upload succesfully" })
    } catch (error) {
        await textContents.findByIdAndDelete(newName.id)
        await deleteFile(newFile.file.id)
        return res.status(400).json({ success: false, error })
    }


})
// @route POST :lessonId/uploadSound
// @desc Upload new file
// @access private
router.post("/:id/:letterId/uploadsound", verifyToken, async (req, res) => {
    const { path } = req.body
    const letter = req.params.letterId

    if (!path)
        return res
            .status(400)
            .json({ success: false, measge: "path is required" })

    try {
        const newFile = await upload(path)


        const newSound = new Sound({
            fileId: newFile.file.id,
            description: newName.id,
            letter: letter
        })
        await newSound.save()
        return res.status(200).json({ success: true, message: "Upload succesfully" })
    } catch (error) {
        await textContents.findByIdAndDelete(newName.id)
        await Sound.findByIdAndDelete(newFile.id)
        return res.status(400).json({ success: false, error })
    }

})
// @route GET :id/
// @desc Get letter from one lesson
// @access private

router.get("/:lessonId", verifyToken, async (req, res) => {
    const language = req.query.language
    const lessonId = req.params.lessonId
    if (!lessonId)
        return res.status(400).json({ success: false, message: "Lesson id is required" })
    try {
        let dataReturn = []
        const letters = await Letter.find({ lesson: lessonId })
        await Promise.all(
            letters.map(async (letter) => {
                const name = await textContents.findById(letter.name)
                if (language == "VietNamese")
                    dataReturn.push({ id: letter.id, name: name.Vietnamese, lesson: lessonId })
                else if (language == "Khmer")
                    dataReturn.push({ id: letter.id, name: name.Khmer, lesson: lessonId })
                else if (language == "English")
                    dataReturn.push({ id: letter.id, name: name.English, lesson: lessonId })
            })
        )
        return res.status(200).json({ success: true, letters: dataReturn })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error })
    }
})
// @Route Dlete lesson/:id
// @desc Delete an letter with id
// @access Private


router.delete("/:letterId", verifyToken, async (req, res) => {
    const letterId = req.params.letterId
    if (!letterId)
        return res.status(400).json({ success: false, message: "Letter ID not found" })
    const thisLetter = await Letter.findById(letterId)
    if (thisLetter) {
        const thisParent = await Lesson.findById(thisLetter.lesson)
        try {
            thisParent.letterCount--
            await thisParent.save()
            await Delete("Letter", letterId)
            return res.status(200).json({ success: true, message: `Delete ${lessonId} successfully` })
        } catch (error) {
            return res.status(400).json({ success: false, mesage: "Delete unsuccessfully" })
        }
    } else {
        return res.status(404).json({ success: false, message: "not found this letter" })
    }

})

export default router