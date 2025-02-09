import mongoose from "mongoose";

const Schema = mongoose.Schema

const answerSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
    }
})

const Answers = mongoose.model("Answer", answerSchema)
export default Answers