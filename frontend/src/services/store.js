import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import apiReducer from './apiSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        api: apiReducer,
    },
})

export default store
