import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    Progress: {
        type: Number,
        require: true,
        default: 0
    }
})

const User = mongoose.model('users', userSchema)
export default User