import { createSlice } from '@reduxjs/toolkit';
import { _login } from '../actions/signin';

export const initialState: any = {
  isloading: false,
  userDetails: {data: { }},
}

const signinSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_login.pending, (state) => ({
        ...state,
        isloading: true,
      }))
      .addCase(_login.fulfilled, (state, action) => ({
        ...state,
        isloading: false,
        ...action.payload,
      }))
      .addCase(_login.rejected, (state, action) => ({
        ...state,
        isloading: false,
        ...action.error,
      }))
  },
})

export default signinSlice.reducer


