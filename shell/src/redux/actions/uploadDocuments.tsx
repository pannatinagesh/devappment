import { Post } from "@/components/apiCall";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dev_url } from '../../../config';

export const _postUploadDoc = createAsyncThunk('postUploadDoc', async (data: any) => {
    const response = await Post(dev_url + '/file-upload', data.data, data.navigate)
    return response
})


