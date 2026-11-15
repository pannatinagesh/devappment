import { createSlice } from '@reduxjs/toolkit';
import { _getuser_details } from '../actions/userDetails';
import { _getAllTask, _getByIdTask } from '../actions/task';

export const initialState = {
    isloading: false,
    isloadingById: false,
    taskDetails: [],
    taskIdDetails: {}
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(_getAllTask.pending, (state) => ({
                ...state,
                isloading: true,
            }))
            .addCase(_getAllTask.fulfilled, (state, action) => ({
                ...state,
                isloading: false,
                taskDetails: action.payload,
            }))
            .addCase(_getAllTask.rejected, (state, action) => ({
                ...state,
                isloading: false,
                ...action.error,
            }))
             .addCase(_getByIdTask.pending, (state) => ({
                ...state,
                isloadingById: true,
            }))
            .addCase(_getByIdTask.fulfilled, (state, action) => ({
                ...state,
                isloadingById: false,
                taskIdDetails: action.payload,
            }))
            .addCase(_getByIdTask.rejected, (state, action) => ({
                ...state,
                isloadingById: false,
                ...action.error,
            }))
    },
})

export default taskSlice.reducer


