
import mongoose from "mongoose"

const Schema = mongoose.Schema

const videoSchema = new Schema({
    fileId:{
        type: mongoose.Types.ObjectId,
        ref: "uploads.files",
        required: true
    },
    description:{
        type: mongoose.Types.ObjectId
    },
    letter:{
        type: mongoose.Types.ObjectId
    }
})

const Video = mongoose.model("videos", videoSchema)
export default Video