import express from 'express'
const router = express.Router()

import Letter from '../module/letter.js'
import textContents from '../module/textContent.js'
import verifyToken from '../middleware/auth.js'
import upload from '../upload.mjs'
import Image from '../module/image.js'
import Video from '../module/video.js'
import Sound from '../module/sounds.js'
import deleteFile from '../function/deleteFile.js'

// @route POST :id/post
// @desc add new lettter
// @access private

router.post("/:id/post", verifyToken, async (req, res) => {
    const { VietnameseName, KhmerName, EnglishName } = req.body;
    const lesson = req.params.id

    //check name
    if (!VietnameseName || !KhmerName || !EnglishName)
        return res
            .status(400)
            .json({ success: false, measge: "Name in all languages are required" });
    //check lesson
    if (!lesson)
        return res
            .status(400)
            .json({ success: false, mesage: "lesson is required" });

    //check name
    const lessonCheck = await Letter.find({ lesson: lesson });
    if (lessonCheck)
        for (let lesson of lessonCheck) {
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
    try {
        // add name colection
        const newName = new textContents({
            Vietnamese: VietnameseName,
            Khmer: KhmerName,
            English: EnglishName,
        });
        await newName.save();

        const newLetter = new Letter({
            name: newName.id,
            lesson: lesson
        });

        await newLetter.save();
        return res
            .status(200)
            .json({ success: true, mesage: "New letter added successfully", id: newLetter.id });
    } catch (error) {
        console.log(error);
        await textContents.deleteOne({ id: newName.id })
        return res
            .status(400)
            .json({ success: false, mesage: "Letter added unsuccessfully" });
    }
});



// @route POST :lessonId/uploadImage
// @desc Upload new file
// @access private
router.post("/:id/:letterId/uploadimage", verifyToken, async (req, res) => {
    const { VietnameseName, KhmerName, EnglishName, path } = req.body
    const letter = req.params.letterId
    if (!VietnameseName || !KhmerName || !EnglishName)
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
            Vietnamese: VietnameseName,
            Khmer: KhmerName,
            English: EnglishName,
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
    const { VietnameseName, KhmerName, EnglishName, path } = req.body
    const letter = req.params.letterId
    if (!VietnameseName || !KhmerName || !EnglishName)
        return res
            .status(400)
            .json({ success: false, measge: "Name in all languages are required" })
    if (!path)
        return res
            .status(400)
            .json({ success: false, measge: "path is required" })

    const uploadResul = await upload(path)
    if(!uploadResul.success)
        return uploadResul
    const newFile = uploadResul
    const newName = new textContents({
        Vietnamese: VietnameseName,
        Khmer: KhmerName,
        English: EnglishName,
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

router.get("/:id", verifyToken, async (req, res) => {
    const lesson = req.params.id
    if (!lesson)
        return res.status(400).json({ success: false, mesage: "Lesson is required" })
    try {
        const letters = await Letter.find({ lesson: lesson })
        return res.status(200).json({ success: true, letters })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, mesage: error })
    }
})

export default router