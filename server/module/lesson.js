import mongoose from "mongoose";
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    chapter:{
        type: Schema.Types.ObjectId,
        ref: 'chapters',
        require: true,
    },
    letterCount:{
        type: Number,
        default: 0,
    }
})

const lesson = mongoose.model('lessons', lessonSchema);
export default lesson;