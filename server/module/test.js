import mongoose from "mongoose";

const Schema = mongoose.Schema

const testChema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
        unique: true
    },
    group: {
        type: [Schema.Types.ObjectId],
        ref: 'Groups',
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    questionCount: {
        type: Number,
        default: 0,
    }
})

const Test = mongoose.model("Test", testChema);
export default Test;