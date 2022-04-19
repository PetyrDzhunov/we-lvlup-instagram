import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types'

export interface PostState {
    allPosts: Post[]
}

const initialState: PostState = {
    allPosts: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.allPosts.push(action.payload)
        },
    },
})

export const { addPost } = postSlice.actions

export default postSlice.reducer
