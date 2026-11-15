import { GetAll, Post, Put } from "@/components/apiCall";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dev_url } from '../../../config';

export const _getuser_details = createAsyncThunk('UserDetailsData', async (data: any) => {
    const response = await GetAll(dev_url + '/user', data.navigate)
    // GetAll returns the full axios response; the list lives on `.data`.
    return response?.data ?? []
})

export const _postUserDetails = createAsyncThunk('postUserDetails', async (data: any) => {
    const response = await Post(dev_url + '/user/create', data.data, data.navigate)
    return response
})

export const _putUserDetails = createAsyncThunk('putUserDetails', async(data: any) => {
 const response = await Put(dev_url + '/user/update/', data.id, data.value, data.navigate)
    return response
})