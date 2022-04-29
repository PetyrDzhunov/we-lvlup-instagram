import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment, Post, ReduxComment } from '../../types'

export interface PostState {
    allPosts: Post[]
    allComments: Comment[]
}

const initialState: PostState = {
    allPosts: [],
    allComments: [],
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
            if (!currentPost.likedBy.includes(user)) {
                currentPost.likedBy.push(user)
            } else {
                const index = currentPost.likedBy.indexOf(user)
                currentPost.likedBy.splice(index, 1)
            }
            // upgrade the current post in allPosts array?
            state.allPosts.splice(currentPostIndex, 1, currentPost)
        },
        addComment: (state, action: PayloadAction<ReduxComment>) => {
            const { comment, commentator, id, commentatorID, commentID } =
                action.payload
            const currentPost = state.allPosts.find((post) => post.id === id)
            if (!currentPost) {
                return
            }
            const newComment: Comment = {
                comment,
                commentator,
                commentatorID,
                commentID,
                likes: [],
                replies: [],
            }
            currentPost.comments.push(newComment)
            state.allComments.push(newComment)
        },
    },
})

export const { loadAllPosts, addPost, likeDislikePost, addComment } =
    postSlice.actions

export default postSlice.reducer
