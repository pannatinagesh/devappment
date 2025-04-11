//For reference
import { createAsyncThunk } from '@reduxjs/toolkit'

export const _login = createAsyncThunk('user/_login', async (data: any) => {
 return data
})

export const _logout = createAsyncThunk<any, any>('user/logout', async () => {
  const response = {}
  return response
})

