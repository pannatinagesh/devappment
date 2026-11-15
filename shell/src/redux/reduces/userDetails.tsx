import { createSlice } from '@reduxjs/toolkit';
import { _getuser_details } from '../actions/userDetails';

export const initialState = {
    isloading: false,
    userDetails: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(_getuser_details.pending, (state) => ({
                ...state,
                isloading: true,
            }))
            .addCase(_getuser_details.fulfilled, (state, action) => ({
                ...state,
                isloading: false,
                userDetails: action.payload,
            }))
            .addCase(_getuser_details.rejected, (state, action) => ({
                ...state,
                isloading: false,
                ...action.error,
            }))
    },
})

export default userSlice.reducer


