import { Post } from '@/components/apiCall'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { dev_url } from '../../../config'

export const _login = createAsyncThunk('user/_login', async (data: any, { rejectWithValue }) => {
  const response = await Post(dev_url + '/user/signin', data.value, data.navigate)
  if (response && response.data && response.data.status) {
    return response.data
  }
  return rejectWithValue(response?.data ?? { message: 'Login failed' })
})

export const _signup = createAsyncThunk('user/_signup', async (data: any) => {
  const response = await Post(dev_url + '/user/signup', data.value, data.navigate)
  return response
})

export const _logout = createAsyncThunk<any, any>('user/logout', async () => {
  const response = {}
  return response
})
