import decrypt from '../../utils/decrypt.js'
import User from '../../models/user.js'
import createToken from '../../utils/createToken.js'
import uid from '../../utils/createUID'
import sharp from 'sharp'
import { v4 } from 'uuid'
import fs from 'fs'


/* USER ENDPOINTS */


// Get user profile information
export const getUser = async (req, res) => {
    const { userID, username } = req.query
    if (!userID && !username) return res.status(400).send("Bad field")

    var searchQurey;
    if (userID) searchQurey = { id: userID }
    else if (username) searchQurey = { username: username }

    const user = await User.findOne(searchQurey)
    if (!user) return res.status(404).send("User not found")
    user.password = null

    res.send(user)
}

// Login with username & password
export const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).send("Bad field")

    const dUsername = decrypt(username)
    const dPassword = decrypt(password)

    const user = await User.findOne({ username: dUsername })
    if (!user) return res.status(404).send("User not found")

    if (dPassword !== decrypt(user.password))
        return res.status(401).send('Invalid auth')

    let token = createToken(user)

    user.token = token
    user.password = null

    res.send(user)
}

// Create account
export const register = async (req, res) => {
    const { mail, name, username, password, registerDate } = req.body
    if (!mail || !name || !username || !password || !registerDate)
        return res.status(400).send("Bad field.");

    const checkUsername = await User.findOne({ username: decrypt(username) })
    if (checkUsername) return res.status(500).send("Username taken")

    const createID = uid()

    const user = new User({
        id: createID,
        name,
        username: decrypt(username),
        mail,
        password,
        registerDate
    })

    await user.save()

    let token = createToken(user)
    user.token = token
    user.password = null

    res.send(user)
}

// Update user information
export const updateUser = async (req, res) => {
    const data = req.body
    if (!data) return res.status(400).send("Bad field.");

    const user = await User.findOne({ id: data.id })
    if (!user) return res.status(404).send("User not found");


    for (const el of Object.keys(data)) {
        user[el] = data[el]
    }

    user.save()

    setTimeout(() => {
        user.password = null
        res.send(user)
    }, 50);
}

// Upload profile picture (if have old avatar delete this)
export const uploadAvatar = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).send("Bad field.");

    const file = req.files[0]
    if (!file) return res.status(400).send("Bad field.");

    const user = await User.findOne({ id: id })
    if (!user) return res.status(404).send("User not found")

    let path = process.env.FILE_STORAGE

    try {
        let isHasPhoto = user.avatar
        if (isHasPhoto) {
            const oldPhotoFileName = isHasPhoto.split("/").pop()
            fs.unlinkSync(path + oldPhotoFileName);
        }
    } catch (error) {
        console.log("Old photo could not be deleted")
    }

    const fileName = `${v4()}.webp`

    await sharp(file.buffer)
        .resize(300, 300)
        .toFile(path + fileName);

    const avatarPath = `http://localhost:3030/images/${fileName}`

    user.avatar = avatarPath
    await user.save()

    setTimeout(() => {
        user.password = null
        res.send(user)
    }, 50);

}

// Follow a user
export const followUser = async (req, res) => {
    const { userID, followToID } = req.body
    if (!userID || !followToID) return res.status(400).send("Bad field.");

    const user = await User.findOne({ id: userID })
    if (!user) return res.status(404).send("User not found")

    const followTo = await User.findOne({ id: followToID })
    if (!followTo) return res.status(404).send("User not found")

    followTo.followers.push(userID)
    user.following.push(followToID)
    followTo.save()
    user.save()

    res.send({
        user: user.following,
        followTo: followTo.followers
    })
}

// Unfollow a user
export const unfollowUser = async (req, res) => {
    const { userID, followToID } = req.body
    if (!userID || !followToID) return res.status(400).send("Bad field.");

    const user = await User.findOne({ id: userID })
    if (!user) return res.status(404).send("User not found")

    const followTo = await User.findOne({ id: followToID })
    if (!followTo) return res.status(404).send("User not found")

    followTo.followers = followTo.followers.filter(id => id !== userID)
    user.following = user.following.filter(id => id !== followToID)
    followTo.save()
    user.save()

    res.send({
        user: user.following,
        followTo: followTo.followers
    })
}

// Delete current profile picture
export const removeAvatar = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).send("Bad field.");

    const user = await User.findOne({ id: id })
    if (!user) return res.status(404).send("User not found");

    try {
        let isHasPhoto = user.avatar
        if (isHasPhoto) {
            const oldPhotoFileName = isHasPhoto.split("/").pop()
            fs.unlinkSync(process.env.FILE_STORAGE + oldPhotoFileName);
            user.avatar = null
            user.save()
        }
    } catch (error) {
        console.log("Avatar could not be deleted.")
    }

    res.send("OK")
}

// Delete user follower
export const removeFollower = async (req, res) => {
    const { id, removeID } = req.body
    if (!id) return res.status(400).send("Bad field.");

    const user = await User.findOne({ id: id })
    if (!user) return res.status(404).send("User not found");

    const removeUser = await User.findOne({ id: removeID })
    if (!removeUser) return res.status(404).send("User not found");

    user.followers = user.followers.filter(i => i !== removeID)
    removeUser.following = removeUser.following.filter(i => i !== id)
    user.save()
    removeUser.save()

    res.send({
        user: user.followers,
        removeUser: removeUser.following
    })
}