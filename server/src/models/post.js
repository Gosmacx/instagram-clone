import { Schema, model } from 'mongoose'

const postSchema = new Schema({
    id: Number,
    user: Number,
    createdDate: Date,
    content: String,
    image: String,
    likes: Array
})

export default model('Post', postSchema)