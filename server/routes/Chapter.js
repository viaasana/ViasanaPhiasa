// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const Chapter = require("../module/chapter");
// const texContents = require("../module/textContent");
// const verifyToken = require("../middleware/auth");
// const lesson = require("./lessons")
// const axios = require("axios")
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import Chapter from '../module/chapter.js';
import textContents from '../module/textContent.js';
import verifyToken from '../middleware/auth.js';
import lesson from './lessons.js';
import axios from 'axios';

// @route GET chapter/
// @desc get all chapter
// @access private


router.get("/", verifyToken, async(req, res)=>{

    try {
        const chapters = await Chapter.find()
        return res.status(200).json({success: true, chapters})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, mesage: error})
    }
})
// @route POST chapter/post
// @desc Create new chapter
// @access private

router.post("/post", verifyToken, async (req, res) => {
    const { VietnameseName, KhmerName, EnglishName } = req.body;
    if (!VietnameseName || !KhmerName || !EnglishName)
        return res
            .status(400)
            .json({ success: false, mesage: "Name in all languages are required" });

    //check if existing chapter with this name
    const nameCheck =await textContents.findOne({Vietnamese: VietnameseName, Khmer: KhmerName, English: EnglishName})

    if(nameCheck)
    {
        return res
            .status(400)
            .json({success: false, mesage: "This name already taken"})
    }

    // add name colection
    const newName = new textContents({
        Vietnamese: VietnameseName,
        Khmer: KhmerName,
        English: EnglishName,
    });
    await newName.save();
    try {

        const newChapter = new Chapter({
        name: newName.id,
        });

        await newChapter.save();

        return res
                .status(200)
                .json({ success: true, mesage: "New chapter added successfully",id: newChapter.id });
    } catch (error) {
        console.log(error);
        await textContents.deleteOne({id: newName.id})
        return res
                .status(400)
                .json({ success: false, mesage: "Chapter added unsuccessfully" });
    }
});

// @route DELETE chapter/post
// @desc Delete one chapter
// @access private
router.delete("/",verifyToken, async(req, res)=>{
    const {chapterId} = req.body
    const deleteChapter = await Chapter.findById(chapterId)
    try {
        await axios.delete(`/${chapterId}`)
        await textContents.findById(deleteChapter.name)
        await Chapter.findByIdAndDelete(chapterId)
        return res.status(200).json({success: true, mesage: "Delete successfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: true, mesage: "Delete unsuccessfully"})
    }
})

router.use("/chapter", lesson)

export default router