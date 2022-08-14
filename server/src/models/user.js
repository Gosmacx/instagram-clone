import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    id: Number,
    name: String,
    username: String,
    mail: String,
    password: String,
    biography: String,
    registerDate: Date,
    avatar: String,
    token: String,
    followers: Array,
    following: Array,
    bookmarks: Array
})

export default model('User', userSchema)