import mongoose from "mongoose"

const Schema = mongoose.Schema

const texContentSchema = new Schema({
    Vietnamese:{
        type: String,
        required: true
    },
    Khmer:{
        type: String,
        require: true
    },
    English:{
        type: String,
        require: true
    }
})

const textContents = mongoose.model('textContents', texContentSchema);
export default textContents