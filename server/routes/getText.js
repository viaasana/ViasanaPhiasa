
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router = express.Router()
import textContents from '../module/textContent.js'


//  @ROUTE GET api/getText/:textId
//  @desc Get text from database
//  @access public
router.get("/:textId", async (req, res) => {
    try {
        const textRespon = await textContents.findById(req.params.textId)
        if (!textRespon)
            return res.status(404).json({ success: false, message: "Text not found" })
        const language = req.language
        let text
        if (language == "Vietnamese")
            text = textRespon.Vietnamese
        else if (language == "Khmer")
            text = textRespon.Khmer
        else
            text = textRespon.English
        return res.status(200).json({ success: true, text })
    } catch (error) {
        return res.status(400).json({ success: false, message: error })
    }
})

export default router