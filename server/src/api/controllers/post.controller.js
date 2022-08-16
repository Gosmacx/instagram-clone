import Post from '../../models/post.js'
import User from '../../models/user.js'
import sharp  from 'sharp'
import { v4 }  from 'uuid'
import uid from '../../utils/createUID'


/* POST ENDPOINTS */


// Get all posts
export const getHome = async (req, res) => {
    const posts = await Post.find({})
    res.send(posts.reverse())
}

// Get specific user posts.
export const getPosts = async (req, res) => {
    const { id } = req.query
    if (!id) return res.status(400).send("Bad field")

    const posts = await Post.find({ user: id })
    if (!posts || posts.length < 0) return res.status(404).send("Posts not found")

    res.send(posts)
}

// Create post with image and content text
export const createPost = async (req, res) => {
    const { userID, content, date } = req.body
    if (!userID || !content || !date) return res.status(400).send("Bad field")
    
    const user = await User.findOne({ id: userID })
    if (!user) return res.status(404).send("User not found")
    
    const file = req.files[0]
    if (!file) return res.status(400).send("Bad field")

    let path = process.env.FILE_STORAGE

    const fileName = `${v4()}.webp`

    await sharp(file.buffer)
        .resize(500, 500)
        .toFile(path + fileName);
    

    const filePath = `http://localhost:3030/images/${fileName}`
    const createUID = uid()

    const post = new Post({
        id: createUID,
        user: userID,
        createdDate: date,
        content: content,
        image: filePath
    })

    await post.save()

    res.send(post)
}