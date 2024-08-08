import mongoose from "mongoose";
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
        unique: true
    },
    chapter:{
        type: Schema.Types.ObjectId,
        ref: 'chapters',
        require: true,
    }
})

const lesson = mongoose.model('lessons', lessonSchema);
export default lesson;