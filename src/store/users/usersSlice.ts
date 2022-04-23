import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'

export interface UserState {
    allUsers: User[]
}

const initialState: UserState = {
    allUsers: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadAllUsers: (state, action: PayloadAction<User[]>) => {
            state.allUsers = action.payload
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.allUsers.push(action.payload)
        },
    },
})

export const { loadAllUsers, addUser } = usersSlice.actions

export default usersSlice.reducer
