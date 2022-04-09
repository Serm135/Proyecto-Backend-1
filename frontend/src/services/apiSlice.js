import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    url: undefined,
}

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setURL: (state, action) => {
            localStorage.setItem('backend_url', action.payload);
            state.url = action.payload
        },
        getURL: (state) => {
            if (!state.url) {
                state.url = localStorage.getItem('backend_url');
            }
        },
    },
})

export const {setURL} = apiSlice.actions

export const getUrl = (state) => state.api.url

export default apiSlice.reducer
