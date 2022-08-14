import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    name: null,
    username: null,
    token: null,
    avatar: null,
    id: null,
    biography: '',
    followers: [],
    following: [],
    mail: null,
    showCreatePost: false
  },
  reducers: {
    loginStore: (state, action) => {

      for (const el of Object.keys(action.payload)) {
        if (!Object.hasOwn(state, el)) continue;
        if (el == 'token') {
          if (!state.token) {
            state.token = {
              headers: {
                "Authorization": `${action.payload.token}`
              }
            }
          }
        } else {
          state[el] = action.payload[el]
        }
      }

    },
    toggleCreatePost: (state, action) => {
      state.showCreatePost = !state.showCreatePost
    },
    updateFollowers: (state, action) => {
      state.followers = action.payload
    },
    updateFollowing: (state, action) => {
      state.following = action.payload
    },
    removeAvatarStore: (state, action) => {
      state.avatar = null
    },
  }
})

export const { loginStore, toggleCreatePost, updateFollowers, updateFollowing, removeAvatarStore } = user.actions

export default user.reducer