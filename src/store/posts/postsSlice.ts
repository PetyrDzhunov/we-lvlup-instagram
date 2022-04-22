import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types'

export interface PostState {
    allPosts: Post[]
    likes: string[]
}

const initialState: PostState = {
    allPosts: [],
    likes: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadAllPosts: (state, action: PayloadAction<Post[]>) => {
            state.allPosts = action.payload
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.allPosts.push(action.payload)
        },
        likeDislikePost: (
            state,
            action: PayloadAction<{ id: string; user: string }>
        ) => {
            // recieve the id for the current post clicked and the user logged in to add him to the likes array
            const { id, user } = action.payload
            const currentPost = state.allPosts.find((post) => post.id === id)
            const currentPostIndex = state.allPosts
                .map((post) => post.id)
                .indexOf(id)
            if (!currentPost) {
                return
            }
            // if you have not liked it yet you are added to the likes array
            if (!currentPost.likes.includes(user)) {
                currentPost.likes.push(user)
            } else {
                const index = currentPost.likes.indexOf(user)
                currentPost.likes.splice(index, 1)
            }
            // upgrade the current post in allPosts array?
            state.allPosts.splice(currentPostIndex, 1, currentPost)
        },
    },
})

export const { loadAllPosts, addPost, likeDislikePost } = postSlice.actions

export default postSlice.reducer
