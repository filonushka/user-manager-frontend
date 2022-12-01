import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params)
  return data
})

export const fetchRegister = createAsyncThunk(
  '/auth/fetchRegister',
  async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me')
  return data
})

export const fetchAuthAll = createAsyncThunk('/auth/fetchAuthAll', async () => {
  const { data } = await axios.get('/auth/all')
  return data
})

export const fetchAuthRemove = createAsyncThunk(
  '/posts/fetchAuthRemove',
  async (id) => axios.delete(`/auth/${id}`)
)

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchAuthAll.pending]: (state) => {
      state.data = []
      state.status = 'loading'
    },
    [fetchAuthAll.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'loaded'
    },
    [fetchAuthAll.rejected]: (state) => {
      state.data = []
      state.status = 'error'
    },
    [fetchAuthRemove.pending]: (state, action) => {
      state.data = state.data.filter((obj) => obj._id !== action.meta.arg)
    },
  },
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const selectIsBlock = (state) => state.auth.data

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
