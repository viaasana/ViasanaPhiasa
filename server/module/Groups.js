import mongoose from "mongoose";

const Schema = mongoose.Schema

const GroupSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'texContents',
        required: true,
    }
})

const Groups = mongoose.model("Group", GroupSchema)
export default Groups