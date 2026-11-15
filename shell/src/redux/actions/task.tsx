import { Get, GetAll, Post, Put } from "@/components/apiCall";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dev_url } from '../../../config';

export const _getAllTask = createAsyncThunk('getAllTask', async (data: any) => {
    const response = await GetAll(dev_url + '/task', data.navigate)
    return response?.data ?? []
})

export const _getByIdTask = createAsyncThunk('getByIdTask', async (data: any) => {
    const response = await Get(dev_url + '/task/', data.id, data.navigate)
    return response;
})

export const _postTask = createAsyncThunk('postTask', async (data: any) => {
    const response = await Post(dev_url + '/task/create', data.data, data.navigate)
    return response
})

export const _putTask = createAsyncThunk('putTask', async(data: any) => {
 const response = await Put(dev_url + '/task/update/', data.id, data.value, data.navigate)
    return response
})