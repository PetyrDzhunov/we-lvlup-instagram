/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    isAuthenticated: boolean
    email: string
    uid: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    email: '',
    uid: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(
            state,
            {
                payload: { email, uid },
            }: PayloadAction<{ email: string; uid: string }>
        ) {
            state.isAuthenticated = true
            state.email = email
            state.uid = uid
        },
        logout(state) {
            state.isAuthenticated = false
            state.email = ''
            state.uid = ''
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
