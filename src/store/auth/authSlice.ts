import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    isAuthenticated: boolean
    email: string
    uid: string
    fullName: string
    theme: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    email: '',
    uid: '',
    fullName: '',
    theme: 'light',
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
            state.theme = 'light'
        },
        logout(state) {
            state.isAuthenticated = false
            state.email = ''
            state.uid = ''
            state.fullName = ''
        },
        toggleTheme(state) {
            if (state.theme === 'light') {
                state.theme = 'dark'
            } else {
                state.theme = 'light'
            }
        },
    },
})

export const { login, logout, toggleTheme } = authSlice.actions

export default authSlice.reducer
