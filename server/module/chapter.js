import mongoose from "mongoose";

const Schema = mongoose.Schema

const chapterSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
        unique: true
    },
    lessonCount:{
        type: Number,
        default: 0,
    }
})

const Chapter = mongoose.model('chapters', chapterSchema);
export default Chapter;