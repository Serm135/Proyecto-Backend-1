import {createSlice} from '@reduxjs/toolkit'
import {fetchPrevLogin} from "./api";

const initialState = {
    data: undefined,
    loading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        dataReceived: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        dataLoading: (state) => {
            if (!state.loading) {
                state.loading = true
            }
        },
    },
})

export const {dataReceived, dataLoading} = userSlice.actions

export const fetchUser = async (dispatch) => {
    dispatch(dataLoading())
    const user_id = localStorage.getItem('user_id');
    const url = localStorage.getItem('backend_url');
    const data = await fetchPrevLogin({url, params: {user_id}}).catch(() => undefined)
    if (data) {
        dispatch(dataReceived(data))
    }
}

export const setUser = async (dispatch, data) => {
    localStorage.setItem('user_id', data._id);
    dispatch(dataReceived(data))
}

export const getUser = (state) => state.user.data
export const isUserLoading = (state) => state.user.loading

export default userSlice.reducer
