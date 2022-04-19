/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    isAuthenticated: boolean
    email: string
    uid: string
    fullName: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    email: '',
    uid: '',
    fullName: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(
            state,
            {
                payload: { email, uid, fullName },
            }: PayloadAction<{ email: string; uid: string; fullName: string }>
        ) {
            state.isAuthenticated = true
            state.email = email
            state.uid = uid
            state.fullName = fullName
        },
        logout(state) {
            state.isAuthenticated = false
            state.email = ''
            state.uid = ''
            state.fullName = ''
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
