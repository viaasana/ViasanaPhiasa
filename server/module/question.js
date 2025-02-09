import mongoose from "mongoose";

const Schema = mongoose.Schema

const questionSchema = new Schema({
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    question:{
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    trueAnswer:{
        type: Schema.Types.ObjectId,
        ref: 'Answers',
        required: true
    },
    falseAnswer1:{
        type: Schema.Types.ObjectId,
        ref: 'Answers',
        required: true
    },
    falseAnswer2:{
        type: Schema.Types.ObjectId,
        ref: 'Answers',
        required: true
    },
    falseAnswer3:{
        type: Schema.Types.ObjectId,
        ref: 'Answers',
        required: true
    }
})

const Question = mongoose.model("Question", questionSchema);
export default Question;