import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Blog, BlogState, Comment } from '../../interfaces'
import axios from 'axios'
import { AppState, AppThunk } from '../store'

const initialState : BlogState = {
  title: "",
  blogList: [],
  isLoading: true,
  blogPost: null,
  commentList: []
}

const blogSlices = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setIsLoading: (state: BlogState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setBlogList: (state: BlogState, action: PayloadAction<Blog[]>) => {
      state.blogList = action.payload
    },
    setBlogPost: (state: BlogState, action: PayloadAction<Blog | null>) => {
      state.blogPost = action.payload
    },
    setCommentList: (state: BlogState, action: PayloadAction<Comment[]>) => {
      state.commentList = action.payload
    }
  }
})

export const getBlogList = (page: number) : AppThunk => async(dispatch, getState) => {
  const currentState = getState()
  console.log("[CURRENT_STATE]", currentState);
  dispatch(setIsLoading(true))
  try{
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch(setIsLoading(false))
    console.log("[response]", res.data);
    if(res && res.data) {
      dispatch(setBlogList(res.data))
    }
  }catch{
    dispatch(setIsLoading(false))
  }
}

export const getBlog = (id: number) :AppThunk => async(dispatch, getState) => {
  const currentState = getState()
  console.log("[CURRENT_STATE]", currentState);
  dispatch(setIsLoading(true))
  try{
    console.log("[id]", id);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    dispatch(setIsLoading(false))
    console.log("Blog res", response);
    
    dispatch(setBlogPost(response.data))
  }catch{
    dispatch(setIsLoading(false))
  }
}

export const getComments = (id:number) : AppThunk => async(dispatch, getState) => {
  const currentState = getState()
  console.log("[CURRENT COMMENT STATE]", currentState);
  dispatch(setIsLoading(true))
  try{
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    console.log("[COMMENT_RESPONSE]", response.data);
    dispatch(setIsLoading(false))
    dispatch(setCommentList(response.data))
  }catch {
    dispatch(setIsLoading(false))
  }
}
export const blogReducer = blogSlices.reducer
export const { setIsLoading, setBlogList, setBlogPost, setCommentList } = blogSlices.actions