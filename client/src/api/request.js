import axios from './axios'
import * as urls from './url'
import encrypt from '../utils/encrypt'

function getMethod(url, responseCB, loadingCB) {
    if (loadingCB) loadingCB(true)
    return axios
        .get(url)
        .then(response => {
            if (responseCB) responseCB(response.data)
            if (loadingCB) loadingCB(false)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            return null
        })
}

function postMethod(url, { data, token }, responseCB, loadingCB) {
    if (loadingCB) loadingCB(true)
    
    let packet = token ? [url, data, token] : [url, data]

    return axios
        .post(...packet)
        .then(response => {
            if (responseCB) responseCB(response.data)
            if (loadingCB) loadingCB(false)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            return null
        })
}



export const loginUser = (...args) => {
    return postMethod(urls.LOGIN_USER, ...args)
}

export const registerUser = (...args) => {
    return postMethod(urls.REGISTER_USER, ...args)
}

export const createPost = (...args) => {
    return postMethod(urls.CREATE_POST, ...args)
}

export const uploadAvatar = (...args) => {
    return postMethod(urls.UPLOAD_AVATAR, ...args)
}

export const updateUser = (...args) => {
    return postMethod(urls.UPDATE_USER, ...args)
}

export const followUser = (...args) => {
    return postMethod(urls.FOLLOW_USER, ...args)
}

export const unfollowUser = (...args) => {
    return postMethod(urls.UNFOLLOW_USER, ...args)
}

export const removeAvatar = (...args) => {
    return postMethod(urls.REMOVE_AVATAR, ...args)
}

export const removeFollower = (...args) => {
    return postMethod(urls.REMOVE_FOLLOWER, ...args)
}

export const getHome = (...args) => {
    return getMethod(urls.GET_HOME, ...args)
}

export const getUser = ({ id, username }, ...args) => {
    var query;
    if (id) query = `?userID=${id}`
    else if (username) query = `?username=${username}`
    return getMethod(urls.GET_USER + query, ...args)
}

export const getPosts = (userID, ...args) => {
    return getMethod(urls.GET_POSTS + `?id=${userID}`, ...args)
}
