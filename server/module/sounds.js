import mongoose from "mongoose";

const Schema = mongoose.Schema

const soundSchema = new Schema({
    fileId:{
        type: mongoose.Types.ObjectId,
        ref: "uploads.files",
        required: true
    },
    letter:{
        type: mongoose.Types.ObjectId
    }
})

const Sound = mongoose.model("sounds", soundSchema);
export default Sound;