import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlbumState, Album, Photos } from '../../interfaces'
import axios from 'axios'
import { AppState, AppThunk } from '../store'

const initialState : AlbumState = {
  title: "",
  albumList: [],
  isLoading: true,
  album: null
}

const albumSlices = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setIsLoading: (state: AlbumState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setAlbumList: (state: AlbumState, action: PayloadAction<Album[]>) => {
      state.albumList = action.payload
    },
    setAlbum: (state: AlbumState, action: PayloadAction<Photos[]>) => {
      state.album = action.payload
    }
  }
})

export const getAlbumList = (page: number) : AppThunk => async(dispatch, getState) => {
  const currentState = getState()
  console.log('[CURRENT_STATE]', currentState);
  dispatch(setIsLoading(true))
  try{
    const res = await axios.get('https://jsonplaceholder.typicode.com/albums')
    dispatch(setIsLoading(false))
    console.log("[RESPONSE]", res.data);
    if(res && res.data) {
      dispatch(setAlbumList(res.data))
    }
  }catch{
    dispatch(setIsLoading(false))
  }
}
export const getAlbum = (id: number) : AppThunk => async(dispatch, getState) => {
  const currentState = getState()
  console.log('[current state]', currentState);
  dispatch(setIsLoading(false))
  try{
    const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
    dispatch(setIsLoading(false))
    console.log('[ALBUM RESPONSE]', res.data);
    if(res && res.data) {
      dispatch(setAlbum(res.data))
    }
  }catch{
    dispatch(setIsLoading(true))
  }
}
export const albumReducer = albumSlices.reducer
export const { setIsLoading, setAlbumList, setAlbum } = albumSlices.actions