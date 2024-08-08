const mongoose = require("mongoose")

const Schema = mongoose.Schema

const adminSchema = new Schema({
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
    }
})

module.exports = mongoose.module('admins', adminSchema)