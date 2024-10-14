import mongoose from "mongoose";

const Schema = mongoose.Schema

const imageSchema = new Schema({
    fileId: {
        type: mongoose.Types.ObjectId,
        ref: "uploads.files",
        required: true
    },
    description: {
        type: mongoose.Types.ObjectId
    },
    letter: {
        type: mongoose.Types.ObjectId
    }
    
})

const Image = mongoose.model("images", imageSchema);
export default Image;