import mongoose from "mongoose";
const Schema = mongoose.Schema

const letterSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
        unique: true
    },
    lesson:{
        type: Schema.Types.ObjectId,
        ref: 'lessons',
        require: true,
    }
})

const Letter = mongoose.model('letters', letterSchema);
export default Letter;