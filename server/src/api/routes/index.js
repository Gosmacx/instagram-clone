import { Router } from "express";
import multer  from "multer"
import {
    login, 
    register,
    getUser,
    uploadAvatar,
    updateUser,
    followUser,
    unfollowUser,
    removeAvatar,
    removeFollower
} from '../controllers/user.controller'
import {
    createPost,
    getHome,
    getPosts
} from '../controllers/post.controller'
import auth from '../middleware/auth.js'

const router = Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.send("just dev.")
})

router.post("/login", login)
router.post("/register", register)
router.post("/create-post", auth, upload.array('files'), createPost)
router.post("/upload-avatar", auth ,upload.array('files'), uploadAvatar)
router.post("/update-user", auth, updateUser)
router.post("/follow", auth, followUser)
router.post("/unfollow", auth, unfollowUser)
router.post("/remove-avatar", auth, removeAvatar)
router.post("/remove-follower", auth, removeFollower)

router.get("/home", getHome)
router.get("/user", getUser)
router.get("/get-posts", getPosts)

export default router;