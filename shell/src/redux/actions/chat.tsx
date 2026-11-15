import { GetAll, Post } from "@/components/apiCall";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dev_url } from '../../../config';

export const _PostChat = createAsyncThunk('chat', async (data: any) => {
    const response = await Post(dev_url + '/chat', data.request, data.navigate)
    return response?.data ?? []
})

export const _GetChat = createAsyncThunk('getChat', async (data: any) => {
    const response = await GetAll(dev_url + '/chat', data.navigate)
    return response?.data ?? []
})
