import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/authSlice'
import postReducer from './posts/postsSlice'
import userReducer from './users/usersSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    auth: authReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: {
        persistedReducer,
        posts: postReducer,
        users: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
