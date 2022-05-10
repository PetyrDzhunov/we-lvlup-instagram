import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Story, User } from '../../types'

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
        addFollower: (
            state,
            action: PayloadAction<{
                loggedInUserId: string
                currentUserId: string
            }>
        ) => {
            const { loggedInUserId, currentUserId } = action.payload
            const userLoggedIn = state.allUsers.find(
                (currUser) => currUser.authID === loggedInUserId
            )
            const userToFollow = state.allUsers.find(
                (currUser) => currUser.authID === currentUserId
            )

            if (!userToFollow) {
                return
            }

            if (userLoggedIn?.authID === userToFollow?.authID) {
                return
            }

            if (!userLoggedIn?.followed.includes(currentUserId)) {
                userLoggedIn?.followed.push(currentUserId)
                userToFollow?.followers.push(loggedInUserId)
            } else {
                const indexOfFollowedUser =
                    userLoggedIn.followed.indexOf(currentUserId)
                const indexOfLoggedInUser =
                    userToFollow?.followers.indexOf(loggedInUserId)
                userLoggedIn.followed.splice(indexOfFollowedUser, 1)
                userToFollow?.followers.splice(indexOfLoggedInUser, 1)
            }
        },
        addStory: (
            state,
            action: PayloadAction<{ userID: string; story: Story }>
        ) => {
            const { userID, story } = action.payload
            const userToAddStoryTo: User | undefined = state.allUsers.find(
                (currUser) => currUser.authID === userID
            )

            if (userToAddStoryTo === undefined || userToAddStoryTo.story) {
                return
            }

            userToAddStoryTo.story = story
        },
    },
})

export const { loadAllUsers, addUser, addFollower, addStory } =
    usersSlice.actions

export default usersSlice.reducer
